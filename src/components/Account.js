import React, { useEffect, useState } from "react";
import {
  useHistory,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";
import { getUserByIdAPI } from "../axios-services";

const Account = ({ setToken, token, user, setUser }) => {
  console.log(user);
  const userId = user.id;
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState(null);

  const fetchUser = async () => {
    const result = await getUserByIdAPI({userId, token});
    if (result.error) {
      setErrorMessage(result.message);
    }
    else {
      setUser(result);
    }
  }

  useEffect(() => {
    if (!token) {
      history.push("/users/login");
    }
    else {
      fetchUser();
    }
  }, [token])

  return (
    <div>
      <h2>Account</h2>
      {errorMessage && <p>{errorMessage}</p>}

      <h3>Username: {user.username}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Address: {user.address ?? 'N/A'}</h3>

      <button 
        type='button'
        onClick={() => setToken('')}
      >Log Out</button>
    </div>
  )
}

export default Account;