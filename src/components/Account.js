import React, { useEffect, useState } from "react";
import {
  useHistory,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";
import { getUserByIdAPI, patchUserAPI } from "../axios-services";

const Account = ({ setToken, token, user, setUser }) => {
  const userId = user.id;
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchUser = async () => {
    const result = await getUserByIdAPI({ userId, token });
    if (result.error) {
      setErrorMessage(result.message);
    }
    else {
      setUser(result);
    }
  }

  const patchUser = async () => {
    const result = await patchUserAPI({
      userId,
      token,
      username,
      email,
      address
    });
    if (result.error) {
      setErrorMessage(result.message);
    }
    else {
      setUser(result);
      setIsEditMode(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setErrorMessage(null);
    let result = await patchUser();
    // setErrorMessage(result)
    await fetchUser();
  }

  useEffect(() => {
    console.log('token', token);
    if (!token) {
      history.push("/users/login");
    }
    else {
      fetchUser();
    }
  }, [token])

  return (
    <>
      <h2>Account</h2>
      <button 
        type='button'
        onClick={() => setIsEditMode(!isEditMode)}
      >{
        isEditMode
          ? 'Exit Edit Mode'
          : 'Update User Info'
      }</button>
      {errorMessage && <p>{errorMessage}</p>}
      {
        isEditMode
          ? <form onSubmit={handleSubmit}>
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
              <button type="submit">Submit</button>
            </form>

          : <div>
            <h3>Username: {user.username}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Address: {user.address ?? 'N/A'}</h3>

            <button
              type='button'
              onClick={() => setToken('')}
            >Log Out</button>
          </div>
      }
    </>
  )
}

export default Account;