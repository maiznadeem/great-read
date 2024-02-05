const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishingYear: {
        type: Number,
        required: true,
    },
    categories: {
        type: [ String ],
    },
    amazon: {
        type: String,
    },
    perlego: {
        type: String,
    },
    quote: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    notes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
    },
});

const Book = mongoose.model('Book', bookSchema, 'Book');

module.exports = Book;
