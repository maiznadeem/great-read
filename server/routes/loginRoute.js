const express = require('express');
const loginRoute = express.Router();

loginRoute.post('/', (req, res) => {
    const { username, password } = req.body;

    const detail1 = process.env.USER_NAME;
    const detail2 = process.env.PASSWORD;

    if (username === detail1 && password === detail2) {
        req.session.isAuthenticated = true;
        res.redirect('/admin');
    } else {
        res.status(401).send('Authentication failed. Please try again.');
    }
});


module.exports = { loginRoute };
