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
  Account,
  Cart,
  Checkout
} from "./index";

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import {
  getAPIHealth,
  getAllRamenFromAPI,
  getAllUsersFromAPI,
  getRamenByIdFromAPI,
  updateRamenFromAPI,
  getUsersItemsByUserIdAPI
} from "../axios-services";

import "../style/App.css";
import AdminProductDetails from "./AdminProductDetails";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [allRamen, setAllRamen] = useState([]);
  const [selectedRamen, setSelectedRamen] = useState(undefined);
  const [token, setToken] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const fetchRamen = async () => {
    const ramen = await getAllRamenFromAPI();
    setAllRamen(ramen);
  }
  const fetchUsers = async () => {
    const users = await getAllUsersFromAPI();
    setAllUsers(users);
  };

  const fetchRamenById = async (id) => {
    const selectedRamen = await getRamenByIdFromAPI(id);
    setSelectedRamen(selectedRamen);
    return selectedRamen;
  };

  const fetchCartItems = async () => {
    const dataUsersItems = await getUsersItemsByUserIdAPI({ userId: user.id, token });
    const newCartItems = [];

    Promise.all(dataUsersItems.map(async (userItem) => {
      const ramen = await fetchRamenById(userItem.ramenId);
      ramen.count = userItem.count;
      newCartItems.push(ramen);
      return ramen;
    }));

    setCartItems(newCartItems);
    return newCartItems;
  }

  useEffect(() => {
    console.log('entered app useEffect');
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
    fetchCartItems();
  }, []);

  return (
    <div className='app-container'>

      <header className='app-header'>
        <h1>We Love Ramen!</h1>

        <div className='header-links-container'>
          <div className='header-links'>
            {user.isAdmin 
            ? <>
            <Link to='/admin/products'>Ramen</Link>
            <Link to='/admin/users'>Users</Link>
            <Link to='/account'>Account</Link> 
            </> :<>
            <Link to='/products'>Ramen</Link> |
            {
              token
                ? <>
                  <Link to='/account'>Account</Link> |
                  <Link to='/cart'>Shopping Cart</Link>
                  </>
                : <Link to='/users/login'>Login</Link>
            }</>}
          </div>
        </div>
      </header>

      <Route exact path='/'>
        <h1>Hello, World!</h1>
        <p>API Status: {APIHealth}</p>
      </Route>

      <Route exact path="/products">
        <Products allRamen={allRamen} fetchRamen={fetchRamen} />
      </Route>

      <Route exact path="/products/:productId">
        <ProductDetails 
          selectedRamen={selectedRamen}
          fetchRamenById={fetchRamenById}
          token={token}/>
      </Route>

      <Route path="/users/:actionType">
        <UserForm setToken={setToken} token={token} setUser={setUser}/>
      </Route>

      <Route path='/account'>
        <Account
          setToken={setToken}
          token={token}
          setUser={setUser}
          user={user}
        />
      </Route>

      <Route path='/cart'>
        <Cart
          token={token}
          user={user}
          fetchRamenById={fetchRamenById}
        />
      </Route>

      <Route path='/checkout'>
        <Checkout 
          token={token}
          fetchRamenById={fetchRamenById}
          user={user}
          fetchCartItems={fetchCartItems}
          cartItems={cartItems}
        />
      </Route>

      <Route exact path="/admin/products">
        <ProductsAdmin allRamen={allRamen} fetchRamen={fetchRamen} />
      </Route>

      <Route path="/admin/users">
        <UsersAdmin allUsers={allUsers} fetchUsers={fetchUsers} 
          selectedRamen={selectedRamen}
          fetchRamenById={fetchRamenById}
          token={token}
        />
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
