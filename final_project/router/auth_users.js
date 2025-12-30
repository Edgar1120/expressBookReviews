const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");

const regd_users = express.Router();
let users = [];

/* Check if username exists */
const isValid = (username) => {
  return users.some(user => user.username === username);
};

/* Authenticate user */
const authenticatedUser = (username, password) => {
  return users.some(
    user => user.username === username && user.password === password
  );
};

/* TAREA 7 — Login */
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!authenticatedUser(username, password)) {
    return res.status(403).json({ message: "Invalid username or password" });
  }

  let accessToken = jwt.sign({ username }, "access", { expiresIn: "1h" });

  req.session.authorization = {
    accessToken,
    username
  };

  return res.status(200).json({ message: "Login successful" });
});

/* TAREA 8 — Add or modify review */
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;

  if (books[isbn]) {
    books[isbn].reviews[username] = review;
    return res.status(200).json({ message: "Review added/updated successfully" });
  }

  return res.status(404).json({ message: "Book not found" });
});

/* TAREA 9 — Delete review */
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if (books[isbn] && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "Review deleted successfully" });
  }

  return res.status(404).json({ message: "Review not found" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
