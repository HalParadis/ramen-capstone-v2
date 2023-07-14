import React, { useState, useEffect } from "react";
import { Route, NavLink, Link } from "react-router-dom";

import {
  Products,
  ProductDetails,
  UserForm,
  UsersAdmin,
  AdminCreateProduct,
  Account,
  Cart,
  Checkout,
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
  getUsersItemsByUserIdAPI,
} from "../axios-services";

import "../style/App.css";
import AdminProductDetails from "./AdminProductDetails";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [allRamen, setAllRamen] = useState([]);
  const [selectedRamen, setSelectedRamen] = useState(undefined);
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );
  const [cartItems, setCartItems] = useState([]);

  const history = useHistory();

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

    if (token !== "") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setUser({});
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token]);

  return (
    <div className="app-container">
      <div className="all-but-footer">
        <header className="app-header">
          <div className="img-header-container">
            {/* <img src="https://media.discordapp.net/attachments/1073475284197711905/1128588836990103643/naruto-flexible-mousepad-naruto-ramen.png?width=916&height=916" /> */}
            <span className="fish-cake">🍥</span>
            <h1 className="header-text"> We Love Ramen! </h1>
          </div>
          <div className="header-links-container">
            <div className="header-links">
              {user.isAdmin ? (
                <>
                  <NavLink
                    activeClassName="selected"
                    className="link"
                    to="/admin/products"
                  >
                    Ramen
                  </NavLink>
                  <NavLink
                    activeClassName="selected"
                    className="link"
                    to="/admin/users"
                  >
                    Users
                  </NavLink>
                  <NavLink
                    activeClassName="selected"
                    className="link"
                    to="/account"
                  >
                    Account
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    activeClassName="selected"
                    className="link"
                    to="/products"
                  >
                    Ramen
                  </NavLink>
                  {token && user.username ? (
                    <>
                      <NavLink
                        activeClassName="selected"
                        className="link"
                        to="/account"
                      >
                        Account
                      </NavLink>
                      <NavLink
                        activeClassName="selected"
                        className="link"
                        to="/cart"
                      >
                        Cart
                      </NavLink>
                    </>
                  ) : (
                    <NavLink
                      activeClassName="selected"
                      className="link"
                      to="/users/login"
                    >
                      Login
                    </NavLink>
                  )}
                </>
              )}
            </div>
          </div>
        </header>

        <Route exact path="/">
          <div className="welcome-message-container">
            <h2>
              🍜 Welcome to our site, made by Ramen Lovers for Ramen Lovers! 🍜
            </h2>
          </div>
        </Route>

        <Route path="/products">
          <Products allRamen={allRamen} fetchRamen={fetchRamen} user={user} />
        </Route>

        <Route path="/product/:productId">
          <ProductDetails
            selectedRamen={selectedRamen}
            fetchRamenById={fetchRamenById}
            token={token}
            user={user}
          />
        </Route>

        <Route path="/users/:actionType">
          <UserForm setToken={setToken} token={token} setUser={setUser} />
        </Route>

        <Route path="/account">
          <Account
            setToken={setToken}
            token={token}
            setUser={setUser}
            user={user}
          />
        </Route>

        <Route path="/cart">
          <Cart token={token} user={user} fetchRamenById={fetchRamenById} />
        </Route>

        <Route path="/checkout">
          <Checkout
            token={token}
            fetchRamenById={fetchRamenById}
            user={user}
            // fetchCartItems={fetchCartItems}
            cartItems={cartItems}
          />
        </Route>

        <Route path="/thank_you!">
          <div className="thank-you-message">
            <h2 className="thank-you-text">
              Thank You For Choosing To Shop With Us Today! 🍜
            </h2>
            <button className="continue-shopping">
              {" "}
              <Link to="/products">Continue Shopping</Link>{" "}
            </button>
          </div>
        </Route>

        {user.isAdmin ? (
          <>
            <Route path="/admin/products">
              <Products
                allRamen={allRamen}
                fetchRamen={fetchRamen}
                user={user}
              />
            </Route>

            <Route path="/admin/users">
              <UsersAdmin
                allUsers={allUsers}
                fetchUsers={fetchUsers}
                selectedRamen={selectedRamen}
                fetchRamenById={fetchRamenById}
                token={token}
              />
            </Route>
          </>
        ) : null}

        <Route path="/admin/product/:productId">
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
          <AdminCreateProduct token={token} fetchRamen={fetchRamen} />
        </Route>
      </div>

      <footer className="footer">
        <p className="footer-text">Enjoy Your Ramen!</p>
        <small>
          This site was made for demonstration purposes only. No actual products
          are sold on this site.
        </small>
      </footer>
    </div>
  );
};

export default App;
