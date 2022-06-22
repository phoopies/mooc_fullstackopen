import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState("");

  let errorTimeoutID;
  const showError = (msg, timeSeconds) => {
    if (errorTimeoutID) {
      clearTimeout(errorTimeoutID);
    }
    setError(msg);
    errorTimeoutID = setTimeout(() => setError(""), timeSeconds * 1000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      {error && <div>{error}</div>}

      <Authors show={page === "authors"} showError={showError} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} showError={showError} />
    </div>
  );
};

export default App;
