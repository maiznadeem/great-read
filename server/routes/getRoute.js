const express = require('express');
const getRoute = express.Router();
const Book = require('../models/Book');

// Change the route to handle POST requests
getRoute.post('/books', async (req, res) => {
    const { offset, limit, categories } = req.body;

    try {
        const offsetNum = parseInt(offset);
        const limitNum = parseInt(limit);
        let query = Book.find({});
        let totalCountQuery = Book.countDocuments();

        if (categories && categories.length > 0) {
            query = query.where('categories').in(categories);
            totalCountQuery = totalCountQuery.where('categories').in(categories);
        }

        const books = await query
            .skip(offsetNum)
            .limit(limitNum)
            .exec();

        const totalCount = await totalCountQuery.exec();
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
