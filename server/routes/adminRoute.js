const express = require('express');
const multer = require('multer');
const path = require('path');
const adminController = require('../controllers/adminController');

const adminRoute = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

const adminPagePath = path.join(__dirname, '..', 'pages', 'adminpage');
const updatePagePath = path.join(__dirname, '..', 'pages', 'updatepage');
const quotePagePath = path.join(__dirname, '..', 'pages', 'quotespage');

adminRoute.use(express.static(adminPagePath));
adminRoute.use('/update', express.static(updatePagePath));
adminRoute.use('/quotes', express.static(quotePagePath));

adminRoute.post('/upload', upload.single('image'), adminController.uploadBook);

module.exports = { adminRoute };