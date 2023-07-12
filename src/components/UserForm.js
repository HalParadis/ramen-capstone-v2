import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
  Link,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import { loginAPI, registerAPI } from "../axios-services";

const UserForm = ({ setToken, token, setUser}) => {
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
      if(result.user.isAdmin===true){
        history.push("/account")
      }
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
    if (token) history.push("/account");
  }, [token]);

  return (
    <>
      <h2 className="login-register">{actionType === "login" ? "Login" : "Register"}</h2>
      <form className="form-login" onSubmit={handleSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="login-inputs">
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
        </div>
        <div className="login-inputs">
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
        </div>
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
        <button className="login-button" type="submit">Submit</button>
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
