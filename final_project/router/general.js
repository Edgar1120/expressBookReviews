const express = require('express');
let books = require('./booksdb.js');
const public_users = express.Router();

/**
 * Get the book list available in the shop
 */
public_users.get('/', async (req, res) => {
  try {
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

/**
 * Get book details based on ISBN
 */
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving book" });
  }
});

/**
 * Get book details based on author
 */
public_users.get('/author/:author', async (req, res) => {
  try {
    const author = req.params.author.toLowerCase();

    const filteredBooks = Object.values(books).filter(
      book => book.author.toLowerCase() === author
    );

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    } else {
      return res.status(404).json({ message: "No books found for this author" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by author" });
  }
});

/**
 * Get book details based on title
 */
public_users.get('/title/:title', async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();

    const filteredBooks = Object.values(books).filter(
      book => book.title.toLowerCase() === title
    );

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    } else {
      return res.status(404).json({ message: "No books found with this title" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by title" });
  }
});

/**
 * Get book reviews based on ISBN
 */
public_users.get('/review/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
      return res.status(200).json(book.reviews);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving reviews" });
  }
});

module.exports = public_users;
