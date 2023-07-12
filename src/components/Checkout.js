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
  user,
  fetchCartItems,
  cartItems
}) => {
  // const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [needToUpdatePrice, setNeedToUpdatePrice] = useState(false);
  const history = useHistory();

  // const fetchCartItems = async () => {
  //   const dataUsersItems = await getUsersItemsByUserIdAPI({ userId: user.id, token });
  //   const newCartItems = [];

  //   Promise.all(dataUsersItems.map(async (userItem) => {
  //     const ramen = await fetchRamenById(userItem.ramenId);
  //     ramen.count = userItem.count;
  //     newCartItems.push(ramen);
  //     return ramen;
  //   }));

  //   setCartItems(newCartItems);
    
  //   console.log('newCartItems: ', newCartItems);

  //   return newCartItems;
  // }

  const updatePrice = () => {
    let newTotalPrice = 0;
    cartItems.forEach(cartEl => {
      let elPrice = cartEl.price.replace(/[^\.0-9]/, '');
      newTotalPrice += elPrice * cartEl.count;
      //console.log('newTotalPrice', newTotalPrice);
    });
    // console.log('cartItems[0]', cartItems[0]);
    // for (let i = 0; i < cartItems.length; i++) {
    //   newTotalPrice += cartItems[i].price * cartItems[i].count;
    //   console.log('newTotalPrice', newTotalPrice);
    // }
    setTotalPrice(newTotalPrice);
  }

  // const updateCartAndPrice = async () => {
  //   // await fetchCartItems();
  //   updatePrice();
  // }

  const handleDelete = async (itemId) => {
    const dataUsersItems = await getUsersItemsByUserIdAPI({ userId: user.id, token });
    const { id } = dataUsersItems.find(userItem => userItem.ramenId == itemId);
    const deletedUserItem = await deleteUserItemAPI({ userItemId: id, token });
    console.log('deletedUserItem', deletedUserItem);
    await fetchCartItems();
  }

  useEffect(() => {
    fetchCartItems();
    updatePrice();
    setNeedToUpdatePrice(false);
  }, [needToUpdatePrice]);

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
              updatePrice={updatePrice}
              setNeedToUpdatePrice={setNeedToUpdatePrice}
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