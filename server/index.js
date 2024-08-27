const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const Payment = require('./models/Payment');

const { adminRoute } = require('./routes/adminRoute');
const { loginRoute } = require('./routes/loginRoute');
const { resetRoute } = require('./routes/resetRoute');
const { logoutRoute } = require('./routes/logoutRoute');
const { getRoute } = require('./routes/getRoute');
const { purchaseRoute } = require('./routes/purchaseRoute');


const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
const dbURL = process.env.MONGO_DB_URL;
const secretKey = process.env.SESSION_SECRET;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/reset/passwordReset', express.static(path.join(__dirname, 'public', 'resetPassword')));

function isAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/authpage');
    }
}

app.use('/login', loginRoute);
app.use('/reset', resetRoute)
app.use('/logout', logoutRoute);
app.use('/get', getRoute);
app.use('/purchase', purchaseRoute);

app.use('/admin', isAuthenticated);
app.use('/admin', adminRoute);
app.get('/', (req, res) => {
    if (req.session.isAuthenticated) {
        res.redirect('/admin');
    } else {
        res.redirect('/authpage');
    }
});
app.get('/authpage', (req, res) => {
    if (req.session.isAuthenticated) {
        res.redirect('/admin');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'authpage', 'index.html'));
    }
});


app.post('/webhooks/stripe', async (req, res) => {
    const payload = req.body;
    const signature = req.headers['stripe-signature'];

    let event;

    if (process.env.LOCAL_NODE_ENV == "PROD") {
        try {
            event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            console.error('Error verifying webhook signature:', err.message);
            return res.sendStatus(400);
        }
    }
    else {
        event = payload;
    }

    try {
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const sessionId = session.id;
            const payment = await Payment.findOne({ stripeId: sessionId });

            if (payment) {
                payment.success = true;
                await payment.save();
                console.log('Payment successful. Session ID:', sessionId);
            } else {
                console.log('Payment not found. Session ID:', sessionId);
            }
        } else {
            console.log('Unhandled event type:', event.type);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('Error handling webhook event:', error.message);
        res.sendStatus(500);
    }
});



mongoose
    .connect(dbURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});