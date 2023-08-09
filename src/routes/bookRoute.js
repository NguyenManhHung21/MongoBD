const express = require('express');
const { getBooks, getOneBook, addBook, deleteBook, updateBook } = require('../controllers/bookControllers');

const bookRoute = express.Router();

bookRoute.get('/books/:id', getOneBook);
bookRoute.delete('/books/:id', deleteBook);
bookRoute.put('/books/:id', updateBook);
bookRoute.post('/books', addBook);
bookRoute.get('/books', getBooks);
module.exports = bookRoute;