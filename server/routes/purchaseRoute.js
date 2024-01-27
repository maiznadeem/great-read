const express = require('express');
const purchaseController = require('../controllers/purchaseController');

const purchaseRoute = express.Router();

purchaseRoute.post('/purchase', purchaseController.getWordDocument);

module.exports = { purchaseRoute };