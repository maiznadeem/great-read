const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

const { adminRoute } = require('./routes/adminRoute');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 5000;
const dbURL = process.env.MONGO_DB_URL;

mongoose
    .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/admin', adminRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
