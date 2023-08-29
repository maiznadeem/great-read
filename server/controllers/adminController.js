const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { validationResult } = require('express-validator');

const storage = new Storage({
    keyFilename: path.join(__dirname, 'service-account.json'),
});

const Book = require('../models/Book');
const Quote = require('../models/Quote')

async function uploadBook(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const bucketName = 'great-read-storage-bucket-maiz';
        const folderName = 'books';
        const uniqueIdentifier = uuidv4();
        const objectName = folderName + '/' + uniqueIdentifier + '-' + req.file.originalname;

        const bucket = storage.bucket(bucketName);
        const file = bucket.file(objectName);

        await file.save(req.file.buffer, {
            contentType: req.file.mimetype,
        });

        const publicUrl = `https://storage.googleapis.com/${bucketName}/${objectName}`;

        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishingYear: req.body.publishingYear,
            categories: req.body.categories,
            amazon: req.body.amazon,
            perlego: req.body.perlego,
            quote: req.body.quote,
            image: publicUrl,
        });

        await newBook.save();

        res.status(200).json({ message: 'Book uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Could not upload the file.' });
    }
}

async function uploadQuote(req, res) {
    try {
        const { author, quote } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ error: 'No image file uploaded.' });
        }

        const uniqueIdentifier = uuidv4();

        const bucketName = 'great-read-storage-bucket-maiz';
        const folderName = 'quotes';
        const objectName = `${folderName}/${uniqueIdentifier}-${imageFile.originalname}`;

        const bucket = storage.bucket(bucketName);
        const file = bucket.file(objectName);

        await file.save(req.file.buffer, {
            contentType: req.file.mimetype,
        });

        const imageUrl = `https://storage.googleapis.com/${bucketName}/${objectName}`;

        const newQuote = new Quote({
            author,
            quote,
            image: imageUrl,
        });

        await newQuote.save();

        res.status(200).json({ message: 'Quote added successfully' });
    } catch (error) {
        console.error('Error adding quote:', error);
        res.status(500).json({ error: 'Could not add the quote.' });
    }
}

async function searchQuote(req, res) {
    try {
        const searchTerm = req.query.term;
        let quotes;
        if (!searchTerm || searchTerm.trim() === "") {
            quotes = await Quote.find({}, { image: 0 });
        } else {
            quotes = await Quote.find({
                $or: [
                    { author: { $regex: searchTerm, $options: 'i' } },
                    { quote: { $regex: searchTerm, $options: 'i' } },
                ],
            }, { image: 0 });
        }
        res.json(quotes);
    } catch (error) {
        console.error('Error searching quotes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteQuote(req, res) {
    try {
        const quoteId = req.body.quoteId;
        const existingQuote = await Quote.findById(quoteId);
        if (!existingQuote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        const imageUrl = existingQuote.image;
        if (imageUrl) {
            const bucketName = 'great-read-storage-bucket-maiz';
            const objectName = imageUrl.replace(`https://storage.googleapis.com/${bucketName}/`, '');
            const bucket = storage.bucket(bucketName);
            const file = bucket.file(objectName);
            await file.delete();
        }
        await existingQuote.deleteOne();
        res.status(200).json({ message: 'Quote deleted successfully' });
    } catch (error) {
        console.error('Error deleting quote:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    uploadBook,
    uploadQuote,
    searchQuote,
    deleteQuote,
};
