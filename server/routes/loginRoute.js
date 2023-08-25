const express = require('express');
const loginRoute = express.Router();

loginRoute.post('/', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        req.session.isAuthenticated = true;
        res.redirect('/admin');
    } else {
        res.status(401).send('Authentication failed. Please try again.');
    }
});


module.exports = { loginRoute };
