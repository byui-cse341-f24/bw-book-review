const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        required: false,
    },
    genre: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User',
        unique: true,
    },
}); 

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
