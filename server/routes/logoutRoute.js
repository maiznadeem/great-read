const express = require('express');
const logoutRoute = express.Router();

logoutRoute.post('/', (req, res) => {
    req.session.isAuthenticated = false;
    res.redirect('/');
});

module.exports = { logoutRoute };
