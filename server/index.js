const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const port = process.env.PORT;
const dbURL = process.env.MONGO_DB_URL;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
