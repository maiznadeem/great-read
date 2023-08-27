const express = require('express');
const getRoute = express.Router();
const Book = require('../models/Book');
getRoute.get('/books', async (req, res) => {
    const { offset, limit } = req.query;

    try {
        const offsetNum = parseInt(offset);
        const limitNum = parseInt(limit);
        const books = await Book.find({})
            .skip(offsetNum)
            .limit(limitNum);
        const totalCount = await Book.countDocuments();
        res.json({
            books,
            totalCount,
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = { getRoute };
