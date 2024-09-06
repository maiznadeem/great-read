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
        type: [String],
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
    priority: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema, 'Book');

module.exports = Book;
