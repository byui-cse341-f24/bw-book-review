const Book = require('../models/bookModel');
const { ObjectId } = require('mongodb');

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        console.error('Error fetching books:', books);
        res.status(500).json({ message: err.message });
    }
};

// Get a single book by Id
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found.' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new book review
const addBook = async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
        review: req.body.review
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a book 
const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ messge: 'Book not found.' });
        
        book.title = req.body.title;
        book.author = req.body.author;
        book.rating = req.body.rating;
        book.review = req.body.review;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found. ' });

        await book.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { 
    getAllBooks, 
    getBookById, 
    addBook, 
    updateBook, 
    deleteBook 
};