const express = require('express');
const loginRoute = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

loginRoute.post('/', async (req, res) => {
    const { username, password } = req.body;
    const email = username;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Authentication failed. Email not found.');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            req.session.isAuthenticated = true;
            res.redirect('/admin');
        } else {
            res.status(401).send('Authentication failed. Incorrect password.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during authentication.');
    }
});

module.exports = { loginRoute };
