import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { CartItem } from "./index";

import { getUsersItemsByUserIdAPI } from "../axios-services";

const Cart = ({ token, fetchRamenById, user }) => {
  const [cartItems, setCartItems] = useState([]);
  const history = useHistory();

  const fetchCartItems = async () => {
    const dataUsersItems = await getUsersItemsByUserIdAPI({
      userId: user.id,
      token,
    });
    const newCartItems = [];

    dataUsersItems.forEach(async (userItem) => {
      const ramen = await fetchRamenById(userItem.ramenId);
      ramen.count = userItem.count;
      newCartItems.push(ramen);
    });

    setCartItems(newCartItems);
  };

  useEffect(() => {
    if (!token) {
      history.push("/users/login");
    } else {
      fetchCartItems();
    }
  }, [token]);

  return (
    <div className="cart-page">
      <h2 className="cart-header-text">My Cart</h2>

      <button
        className="checkout-button"
        type="button"
        onClick={() => history.push("/checkout")}
      >
        Checkout
      </button>

      {cartItems &&
        cartItems.map((item, idx) => {
          return (
            <CartItem
              key={item.id ?? idx}
              item={item}
              token={token}
              user={user}
              fetchCartItems={fetchCartItems}
            />
          );
        })}
    </div>
  );
};

export default Cart;
