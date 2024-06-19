import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Book {
  id: number;
  title: string;
  borrowDate: string;
  returnDate: string;
}

interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    removeBook: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
  },
});

export const { addBook, removeBook, setBooks } = booksSlice.actions;

export default booksSlice.reducer;

// Export RootState type
export type RootState = ReturnType<typeof booksSlice.reducer>;
