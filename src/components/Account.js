import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  deleteUserAPI,
  getUserByIdAPI,
  patchUserAPI,
  deleteUserItemAPI,
  getUsersItemsByUserIdAPI,
} from "../axios-services";

const Account = ({ setToken, token, user, setUser }) => {
  const userId = user.id;
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const fetchUser = async () => {
    const result = await getUserByIdAPI({ userId, token });
    if (result.error) {
      setErrorMessage(result.message);
    } else {
      setUser(result);
    }
  };

  const patchUser = async () => {
    const result = await patchUserAPI({
      userId,
      token,
      username,
      email,
      address,
    });
    if (result.error) {
      setErrorMessage(result.message);
    } else {
      setUser(result);
      setIsEditMode(false);
    }
  };

  const deleteUser = async () => {
    const usersItems = await getUsersItemsByUserIdAPI({ userId, token });

    Promise.all(
      usersItems.map(async (userItem) => {
        return await deleteUserItemAPI({ userItemId: userItem.id, token });
      })
    );

    const result = await deleteUserAPI({ userId, token });
    if (result.error) {
      setErrorMessage(result.message);
    } else {
      setToken("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await patchUser();
    await fetchUser();
  };

  useEffect(() => {
    if (!token) {
      history.push("/users/login");
    } else {
      fetchUser();
    }
  }, [token]);

  return (
    <>
      <div className="account-page">
        <header className="account-header">
          <h2 className="account-text">Account</h2>

          <div className="account-buttons-container">
            <button type="button" onClick={() => setIsEditMode(!isEditMode)}>
              {isEditMode ? "Exit Edit Mode" : "Update User Info"}
            </button>

            <button type="button" onClick={() => setToken("")}>
              Log Out
            </button>

            {!isDeleteMode && (
              <button type="button" onClick={() => setIsDeleteMode(true)}>
                Delete Account
              </button>
            )}
          </div>
        </header>
        {isDeleteMode && (
          <div className="delete-confirmation-container">
            Are You Sure? <span className='raised-eyebrow-emoji'>🤨</span>
            <span className="delete-confirmation-buttons">
              <button type="button" onClick={() => setIsDeleteMode(false)}>
                Cancel
              </button>
              <button type="button" onClick={deleteUser}>
                Delete
              </button>
            </span>
          </div>
        )}
        {errorMessage && <p>{errorMessage}</p>}
        {isEditMode ? (
          <form className="account-fields" onSubmit={handleSubmit}>
            <div className="account-field-input-container">
              <div className="account-field-input">
                <label htmlFor="username">Username: </label>
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
            </div>
            <div className="account-field-input-container">
              <div className="account-field-input">
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  minLength="3"
                  maxLength="30"
                  required
                />
              </div>
            </div>
            <div className="account-field-input-container">
              <div className="account-field-input">
                <label htmlFor="address">Address: </label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  minLength="3"
                  maxLength="40"
                />
              </div>
            </div>
            <button className='account-edit-submit-button' type="submit">Submit</button>
          </form>
        ) : (
          <div className="account-fields">
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Address: {user.address ?? "N/A"}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Account;
