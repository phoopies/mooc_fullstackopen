import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("library-user-token"));

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigateToHome();
  };

  let errorTimeoutID;
  const showError = (msg, timeSeconds) => {
    if (errorTimeoutID) {
      clearTimeout(errorTimeoutID);
    }
    setError(msg);
    errorTimeoutID = setTimeout(() => setError(""), timeSeconds * 1000);
  };

  const navigateToHome = () => {
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>recommendations</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}{" "}
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <Authors show={page === "authors"} showError={showError} />

      <Books show={page === "books"} />

      <Recommendations show={page==="recommendations"} />

      <NewBook show={page === "add"} showError={showError} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        showError={showError}
        navigateToHome={navigateToHome}
      />
    </div>
  );
};

export default App;
