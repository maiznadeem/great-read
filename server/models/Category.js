const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    bestseller: {
        type: Boolean,
        default: false,
    },
});

const Category = mongoose.model('Category', categorySchema, 'Category');

module.exports = Category;
