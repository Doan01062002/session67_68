import React, { useState } from "react";
import "./App.css";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Library Borrow-Return System</h1>
        <button onClick={() => setShowForm(true)}>Add Information</button>
      </header>
      {showForm && <BookForm onClose={() => setShowForm(false)} />}
      <BookList></BookList>
    </div>
  );
};

export default App;
