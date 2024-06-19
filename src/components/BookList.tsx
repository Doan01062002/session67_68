// src/components/BookList.tsx

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store"; // Import RootState
import { removeBook, setBooks } from "../features/books/booksSlice";
import ConfirmModal from "./ConfirmModal";

const BookList: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books); // Correct usage of RootState
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);

  useEffect(() => {
    const savedBooks: any[] = JSON.parse(localStorage.getItem("books") || "[]");
    dispatch(setBooks(savedBooks));
  }, [dispatch]);

  const handleDelete = (id: number) => {
    setShowModal(true);
    setBookToDelete(id);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      dispatch(removeBook(bookToDelete));
      removeFromLocalStorage(bookToDelete);
      setShowModal(false);
    }
  };

  const removeFromLocalStorage = (id: number) => {
    const currentBooks: any[] = JSON.parse(
      localStorage.getItem("books") || "[]"
    );
    const updatedBooks = currentBooks.filter((book) => book.id !== id);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  return (
    <div>
      <h2>Borrowed Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - Borrow Date: {book.borrowDate} - Return Date:{" "}
            {book.returnDate}
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {showModal && (
        <ConfirmModal
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default BookList;
