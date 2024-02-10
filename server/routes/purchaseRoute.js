const express = require('express');
const purchaseController = require('../controllers/purchaseController');

const purchaseRoute = express.Router();

purchaseRoute.post('/', purchaseController.authorizePurchase);

module.exports = { purchaseRoute };