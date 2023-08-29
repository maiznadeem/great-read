const express = require('express');
const getRoute = express.Router();
const Book = require('../models/Book');
const TopPicks = require('../models/TopPicks');
const Quote = require('../models/Quote');

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

getRoute.get('/toppicks', async (req, res) => {
    try {
        const topPicks = await TopPicks.findOne().populate({
            path: 'books',
            model: 'Book'
        }).exec();     
        if (!topPicks) {
            return res.status(404).json({ message: 'No top picks found' });
        }
        res.json(topPicks);
    } catch (error) {
        console.error('Error fetching top picks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

getRoute.get('/quotes', async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.json(quotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = { getRoute };
