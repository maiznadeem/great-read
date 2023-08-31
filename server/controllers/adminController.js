const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { validationResult } = require('express-validator');

const storage = new Storage({
    keyFilename: path.join(__dirname, 'service-account.json'),
});

const Book = require('../models/Book');
const Quote = require('../models/Quote')
const TopPicks = require('../models/TopPicks');

const checkDuplicateTitle = async (req, res, next) => {
    try {
        const title = req.body.title;
        console.log(title)
        const existingBook = await Book.findOne({ title: { $regex: new RegExp('^' + title + '$', 'i') } });
        console.log(existingBook)
        if (existingBook) {
            return res.status(409).json({
                error: 'Book with the same title already exists. Do you want to proceed with the upload?',
                confirmationRequired: true,
            });
        }
        next();
    } catch (error) {
        console.error('Error checking duplicate title:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


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

async function getBook(req, res) {
    const bookId = req.params.id;
    try {
        const book = await Book.findById(bookId);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Could not fetch the book.' });
    }
}

async function updateBook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const bookId = req.body.bookId;
        const existingBook = await Book.findById(bookId);
        if (!existingBook) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        let imageUrl = existingBook.image;
        if (req.file) {
            const parts = imageUrl.split('/');
            const fileName = parts[parts.length - 1];
            const bucketName = 'great-read-storage-bucket-maiz';
            const fileToDelete = storage.bucket(bucketName).file('books/' + fileName);
            await fileToDelete.delete();
            const folderName = 'books';
            const uniqueIdentifier = uuidv4();
            const objectName = folderName + '/' + uniqueIdentifier + '-' + req.file.originalname;

            const bucket = storage.bucket(bucketName);
            const file = bucket.file(objectName);
            await file.save(req.file.buffer, {
                contentType: req.file.mimetype,
            });
            imageUrl = `https://storage.googleapis.com/${bucketName}/${objectName}`;
        }
        const categories = JSON.parse(req.body.categories);
        console.log(categories)
        const updatedBook = {
            title: req.body.updateTitle,
            author: req.body.updateAuthor,
            publishingYear: req.body.updatePublishingYear,
            categories: categories, 
            amazon: req.body.amazon,
            perlego: req.body.perlego,
            quote: req.body.quote,
            image: imageUrl,
        };
        await Book.findByIdAndUpdate(bookId, updatedBook);

        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Could not update the book.' });
    }
}

async function deleteBook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const bookId = req.params.id;
        const existingBook = await Book.findById(bookId);
        if (!existingBook) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        if (existingBook.image) {
            const parts = existingBook.image.split('/');
            const fileName = parts[parts.length - 1];
            const bucketName = 'great-read-storage-bucket-maiz';
            const fileToDelete = storage.bucket(bucketName).file('books/' + fileName);
            await fileToDelete.delete();
        }
        await Book.findByIdAndDelete(bookId);

        res.status(200).json({ message: 'Book deleted successfully.' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Could not delete the book.' });
    }
}

async function searchBook(req, res) {
    try {
        const searchTerm = req.query.term;
        let books;
        if (!searchTerm || searchTerm.trim() === "") {
            books = await Book.find({}, { title: 1, author: 1 });
        } else {
            books = await Book.find({
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { author: { $regex: searchTerm, $options: 'i' } },
                ],
            }, { title: 1, author: 1 });
        }
        res.json(books);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ error: 'Internal server error' });
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

async function updateTopPicks(req, res) {
    try {
        const existingTopPicks = await TopPicks.findOne();
        if (!existingTopPicks) {
            return res.status(404).json({ message: 'TopPicks document not found.' });
        }
        const { month, year, book1Id, book2Id, book3Id } = req.body;
        existingTopPicks.date.month = month;
        existingTopPicks.date.year = year;
        existingTopPicks.books[0] = book1Id;
        existingTopPicks.books[1] = book2Id;
        existingTopPicks.books[2] = book3Id;
        await existingTopPicks.save();
        res.status(200).json({ message: 'TopPicks updated successfully.' });
    } catch (error) {
        console.error('Error updating TopPicks:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = {
    checkDuplicateTitle,
    uploadBook,
    getBook,
    updateBook,
    deleteBook,
    searchBook,
    uploadQuote,
    searchQuote,
    deleteQuote,
    updateTopPicks,
};
