import React, { useState, useEffect, } from 'react';
import { useHistory, Link } from 'react-router-dom';

import {
  getUsersItemsByUserIdAPI,
  patchUserItemAPI,
  deleteUserItemAPI,
  getAllRamenFromAPI
} from '../axios-services';

const Cart = ({
  token,
  fetchRamen,
  fetchRamenById,
  user
}) => {
  const [cartItems, setCartItems] = useState([]);
  const history = useHistory();

  const fetchCartItems = async () => {
    const dataUsersItems = await getUsersItemsByUserIdAPI({userId: user.id, token});
    const newCartItems = [];

    dataUsersItems.forEach(async (userItem) => {
      const ramen = await fetchRamenById(userItem.ramenId);
      ramen.count = userItem.count;
      newCartItems.push(ramen);
    });

    setCartItems(newCartItems);
  }

  const handleDelete = async (itemId) => {
    const dataUsersItems = await getUsersItemsByUserIdAPI({userId: user.id, token});
    const { id } = dataUsersItems.find(userItem => userItem.ramenId == itemId);
    console.log("test id here: ", id)
    console.log("also checking token here :", token)
    const deletedUserItem = await deleteUserItemAPI({userItemId: id, token});
    console.log('deletedUserItem', deletedUserItem);
    await fetchCartItems();
  }


  useEffect(() => {
    if (!token) {
      history.push("/users/login");
    }
    else {
      fetchCartItems();
    }
  }, [token])



  return (
    <>
      <h1>NOW VIEWING SHOPPING CART</h1>
      <h2>{user.username}'s Cart</h2>

      {
        cartItems &&
        cartItems.map((item, idx) => {
          return (
            <div key={item.id ?? idx}>
              <h3>Name: {item.name}</h3>
              <p>Price: {item.price}</p>
              <p>Description: {item.description}</p>
              <h3>Count: {item.count}</h3>

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
              >Delete</button>
            </div>
          )
        })
      }

      <button
        type="button"
        onClick={() => history.push('/checkout')}
      >Checkout</button>

    </>
  )
}

export default Cart;