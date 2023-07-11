import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";

import {
  Products,
  ProductDetails,
  UserForm,
  AdminPage,
  ProductsAdmin,
  UsersAdmin,
  AdminCreateProduct,
} from "./index";

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import {
  getAPIHealth,
  getAllRamenFromAPI,
  getAllUsersFromAPI,
  updateRamenFromAPI,
} from "../axios-services";
import "../style/App.css";
import AdminProductDetails from "./AdminProductDetails";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [allRamen, setAllRamen] = useState([]);
  const [token, setToken] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedRamen, setSelectedRamen] = useState(undefined);

  const fetchRamen = async () => {
    const ramen = await getAllRamenFromAPI();
    setAllRamen(ramen);
  };
  const fetchUsers = async () => {
    const users = await getAllUsersFromAPI();
    setAllUsers(users);
  };

  const fetchRamenById = async (id) => {
    const selectedRamen = await getRamenByIdFromAPI(id);
    setSelectedRamen(selectedRamen);
    return selectedRamen;
  };

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();

    fetchRamen();
    fetchUsers();
  }, []);

  return (
    <div className="app-container">
      <Route exact path="/">
        <h1>Hello, World!</h1>
        <p>API Status: {APIHealth}</p>
      </Route>

      <Route exact path="/products">
        <Products allRamen={allRamen} fetchRamen={fetchRamen} />
      </Route>

      <Route exact path="/products/:productId">
        <ProductDetails />
      </Route>

      <Route path="/users/:actionType">
        <UserForm setToken={setToken} token={token} />
      </Route>

      <Route exact path="/admin">
        <AdminPage
          allRamen={allRamen}
          fetchRamen={fetchRamen}
          allUsers={allUsers}
          fetchUsers={fetchUsers}
        />
      </Route>

      <Route exact path="/admin/products">
        <ProductsAdmin allRamen={allRamen} fetchRamen={fetchRamen} />
      </Route>

      <Route path="/admin/users">
        <UsersAdmin allUsers={allUsers} fetchUsers={fetchUsers} />
      </Route>

      <Route exact path="/admin/products/:productId">
        <AdminProductDetails
          token={token}
          setSelectedRamen={setSelectedRamen}
          selectedRamen={selectedRamen}
          fetchRamenById={fetchRamenById}
          fetchRamen={fetchRamen}
          setAllRamen={setAllRamen}
        />
      </Route>

      <Route exact path="/admin/create">
        <AdminCreateProduct token={token} fetchRamen={fetchRamen}/>
      </Route>
    </div>
  );
};

export default App;
