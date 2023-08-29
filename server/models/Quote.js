const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    quote: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Quote = mongoose.model('Quote', quoteSchema, 'Quote');

module.exports = Quote;
