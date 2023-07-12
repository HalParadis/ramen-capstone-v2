import React, { useState, useEffect, } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  getUsersItemsByUserIdAPI,
  patchUserItemAPI,
  deleteUserItemAPI,
  getAllRamenFromAPI
} from '../axios-services';
import CartItem from './CartItem';

const Checkout = ({
  token,
  fetchRamenById,
  user,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(user.address ?? '');
  const history = useHistory();

  const fetchCartItems = async () => {
    const dataUsersItems = await getUsersItemsByUserIdAPI({userId: user.id, token});
    const newCartItems = [];
    let newTotalPrice = 0;

    dataUsersItems.forEach(async (userItem) => {
      const ramen = await fetchRamenById(userItem.ramenId);
      ramen.count = userItem.count;
      newCartItems.push(ramen);
      let ramenPrice = ramen.price.replace(/[^\.0-9]/, '');
      newTotalPrice += ramenPrice * userItem.count;
      console.log('newTotalPrice', newTotalPrice);
      setTotalPrice(newTotalPrice);
    });

    setCartItems(newCartItems);
  }

  const handleCheckout = async () => {
    cartItems.forEach(async (cartItem) => {
      const dataUsersItems = await getUsersItemsByUserIdAPI({ userId: user.id, token });
      const { id } = dataUsersItems.find(userItem => userItem.ramenId == cartItem.id);
      const deletedUserItem = await deleteUserItemAPI({ userItemId: id, token });
      console.log('deletedUserItem', deletedUserItem);
    });
    history.push('/thank_you!')
  }

  const changeToCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

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
      <h2>Checkout</h2>

      <form>
        <h3>Shipping Address</h3>
        <input 
          type='text'
          name='address'
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </form>

      <div>
        <h3>Cart Items</h3>
        {
          cartItems &&
          cartItems.map((item, idx) => {
            return ( 
              <div key={item.id ?? idx}>
                <span>Name: {item.name} </span>
                <span>Brand: {item.brand} </span>
                <span>Price: {item.price} </span>
                <span>Count: {item.count}</span>
              </div>
            )
          })
        }
      </div>

      <form>
        <h3>Payment Information</h3>
        <lable htmlFor='cardNumber'>Card Number: </lable>
        <input 
          type='text'
          name='cardNumber'
          value='xxxx-xxxx-xxxx-1234'
          readOnly='true'
        />
        <lable htmlFor='cardName'>Name On Card: </lable>
        <input 
          type='text'
          name='cardName'
          value='Jane Doe'
          readOnly='true'
        />
      </form>

      <h3>Total Price: {changeToCurrency.format(totalPrice)}</h3>

      <button
        type="button"
        onClick={handleCheckout}
      >Place Your Order</button>
    </>
  )
}

export default Checkout;