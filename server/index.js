const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const { adminRoute } = require('./routes/adminRoute');
const { loginRoute } = require('./routes/loginRoute');
const { resetRoute } = require('./routes/resetRoute');
const { logoutRoute } = require('./routes/logoutRoute');
const { getRoute } = require('./routes/getRoute');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
const dbURL = process.env.MONGO_DB_URL;
const secretKey = process.env.SESSION_SECRET;

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



mongoose
    .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});