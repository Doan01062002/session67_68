import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, Book } from "../features/books/booksSlice";
import moment from "moment";

const BookForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title ||
      !borrowDate ||
      !returnDate ||
      moment(borrowDate).isBefore(moment()) ||
      moment(returnDate).isBefore(moment())
    ) {
      alert("All fields are required and dates must be valid!");
      return;
    }

    const newBook: Book = {
      id: Date.now(),
      title,
      borrowDate,
      returnDate,
    };

    dispatch(addBook(newBook));
    saveToLocalStorage(newBook);
    onClose();
  };

  const saveToLocalStorage = (book: Book) => {
    const currentBooks: Book[] = JSON.parse(
      localStorage.getItem("books") || "[]"
    );
    currentBooks.push(book);
    localStorage.setItem("books", JSON.stringify(currentBooks));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Book Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Borrow Date:</label>
        <input
          type="date"
          value={borrowDate}
          onChange={(e) => setBorrowDate(e.target.value)}
        />
      </div>
      <div>
        <label>Return Date:</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>
      <button type="submit">Add</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default BookForm;
