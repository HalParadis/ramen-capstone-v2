import React, { useState, useEffect, } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

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
  const [userItems, setUserItems] = useState([]);
  const { actionType } = useParams();
  const history = useHistory();


  const fetchUserItems = async () => {
    const dataUsersItems = await getUsersItemsByUserIdAPI({userId: user.id, token});
    setUserItems(dataUsersItems);
    console.log("datausersItems: ", dataUsersItems);
  }

  const fetchCartItems = async () => {
    userItems.forEach( async (userItem) => {
      const ramen = await fetchRamenById(userItem.ramenId);
      setCartItems(cartItems.push(ramen));
    })
  }

  const handleDelete = async (event) => {
    event.preventDefault();
    const result = await deleteUserItemAPI();
  }


  useEffect(() => {
    fetchUserItems();
    fetchCartItems();
  }, []);



  return (
    <>
      <h1>NOW VIEWING SHOPPING CART</h1>
      <h2>{user.name}'s Cart</h2>

      {
        userItems &&
        userItems.map((item, idx) => {
          return (
            <div key={item.id ?? idx}>
              <h3>Name: {item.name}</h3>
              <p>Price: {item.price}</p>
              <p>Description: {item.description}</p>
              <h3>Count: {item.count}</h3>

              <button
                type="button"
                onClick={handleDelete}
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