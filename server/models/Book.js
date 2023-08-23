const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishingYear: Number,
  categories: [String],
  amazon: String,
  perlego: String,
  quote: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
