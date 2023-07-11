import React, { useState, useEffect, } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { CheckoutItem } from './index';
import {
  getUsersItemsByUserIdAPI,
  patchUserItemAPI,
  deleteUserItemAPI,
  getAllRamenFromAPI
} from '../axios-services';

const Checkout = ({
  token,
  fetchRamenById,
  user
}) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();

  const fetchCartItems = async () => {
    const dataUsersItems = await getUsersItemsByUserIdAPI({ userId: user.id, token });
    const newCartItems = [];

    dataUsersItems.forEach(async (userItem) => {
      const ramen = await fetchRamenById(userItem.ramenId);
      ramen.count = userItem.count;
      newCartItems.push(ramen);
    });

    setCartItems(newCartItems);
    
    cartItems.forEach((cartEl) => {
      setTotalPrice(totalPrice + (cartEl.price * cartEl.count));
    });
  }

  const handleDelete = async (itemId) => {
    const dataUsersItems = await getUsersItemsByUserIdAPI({ userId: user.id, token });
    const { id } = dataUsersItems.find(userItem => userItem.ramenId == itemId);
    const deletedUserItem = await deleteUserItemAPI({ userItemId: id, token });
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
  }, [])

  return (
    <>
      <h2>Checkout</h2>

      {
        cartItems &&
        cartItems.map((item, idx) => {
          return (
            <CheckoutItem
              key={item.id ?? idx}
              item={item}
              token={token}
              user={user}
              fetchCartItems={fetchCartItems}
              handleDelete={handleDelete}
            />
          )
        })
      }

      <h3>Total Price: {totalPrice}</h3>

      <button
        type="button"
        onClick={() => history.push('/checkout')}
      >Place Your Order</button>
    </>
  )
}

export default Checkout;