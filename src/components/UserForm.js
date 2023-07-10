import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";
import { loginAPI, registerAPI } from "../axios-services";

const UserForm = ({ setToken, token, setUser }) => {
  const { actionType } = useParams();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    if (actionType === "login") {
      const result = await loginAPI({ username, password });
      console.log(result);
      if (result.error) {
        setErrorMessage(result.message);
      }
      else {
        setToken(result.token);
        setUser(result.user);
      }
    } 
    else {
      const result = await registerAPI({ username, password, email, address });
      console.log(result);
      if (result.error) {
        setErrorMessage(result.message);
      }
      else {
        setToken(result.token);
        setUser(result.user);
      }
    }
    setPassword("");
    setUsername("");
    setEmail("");
    setAddress("");
  };

  useEffect(() => {
    if (token) history.push("/account"); //Change to account page when possible
  }, [token]);

  return (
    <>
      <h2>{actionType === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          minLength="3"
          maxLength="20"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength="3"
          maxLength="20"
          required
        />
        {actionType === "register" && (
          <>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              minLength="3"
              maxLength="30"
              required
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              minLength="3"
              maxLength="40"
            />
          </>
        )}
        <button type="submit">Submit</button>
        {actionType === "login" ? (
          <Link to="/users/register">
            Don't have an account? Register Here!
          </Link>
        ) : (
          <Link to="/users/login">Already have an account? Login Here!</Link>
        )}
      </form>
    </>
  );
};

export default UserForm;
