const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    bookmarkNo: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    note: {
        type: String,
        required: true
    }
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;