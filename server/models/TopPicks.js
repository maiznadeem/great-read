const mongoose = require('mongoose');

const topPicksSchema = new mongoose.Schema({
  date: {
    month: Number,
    year: Number,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
});

const TopPicks = mongoose.model('TopPicks', topPicksSchema, 'TopPicks');

module.exports = TopPicks;
