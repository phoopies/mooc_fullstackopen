import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken, showError, navigateToHome }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      showError(error.graphQLErrors[0].message, 5);
    },
  });

  useEffect(() => {
    if (result.data) {
      setUsername("");
      const token = result.data.login.token;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      navigateToHome();
    }
  }, [result.data]); // eslint-disable-line

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ variables: { username, password } });
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <br />
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default LoginForm;
