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
      setTotalPrice(newTotalPrice);
    });

    setCartItems(newCartItems);
  }

  const handleCheckout = async () => {
    cartItems.forEach(async (cartItem) => {
      const dataUsersItems = await getUsersItemsByUserIdAPI({ userId: user.id, token });
      const { id } = dataUsersItems.find(userItem => userItem.ramenId == cartItem.id);
      const deletedUserItem = await deleteUserItemAPI({ userItemId: id, token });
      return deletedUserItem;
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
    <div className='checkout-page'>
      <h2>Checkout</h2>

      <div className='checkout-page-sub-container'>
        <form className='shipping-address-form'>
          <h3 className='checkout-h3'>Shipping Address</h3>
          <input 
            type='text'
            name='address'
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </form>

        <div className='cart-items-container'>
          <h3 className='checkout-h3'>Cart Items</h3>
          {
            cartItems &&
            cartItems.map((item, idx) => {
              return ( 
                <div className='checkout-item' key={item.id ?? idx}>
                  <div>
                    <span>{item.count} </span>
                    <span>{item.brand} </span>
                    <span>{item.name} </span>
                  </div>
                  <span>Unit Price: {item.price} </span>
                </div>
              )
            })
          }
        </div>

        <form className='payment-info-container'>
          <h3 className='checkout-h3'>Payment Information</h3>
          <div className='payment-info'>
            <lable htmlFor='cardNumber'>Card Number: </lable>
            <input 
              type='text'
              name='cardNumber'
              value='xxxx-xxxx-xxxx-1234'
              readOnly='true'
            />
          </div>
          <div className='payment-info'>
            <lable htmlFor='cardName'>Name On Card: </lable>
            <input 
              type='text'
              name='cardName'
              value={`${user.username}`}
              readOnly='true'
            />
          </div>
        </form>
      </div>
      <h3>Total Price: {changeToCurrency.format(totalPrice)}</h3>

      <button
        type="button"
        onClick={handleCheckout}
      >Place Your Order</button>
    </div>
  )
}

export default Checkout;