import React, { useEffect, useState } from 'react';
import { getUsersItemsByUserIdAPI, patchUserItemAPI} from '../axios-services';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CheckoutItem = ({
  item,
  handleDelete,
  token,
  user,
  setNeedToUpdatePrice,
  updatePrice,
  fetchCartItems
}) => {
  const [count, setCount] = useState(item.count);
  // const [userItem, setUserItem] = useState({});
  
  const setCartItem = async () => {
    // console.log('old count', count);
    // setCount(newCount);
    // console.log('new count', count);
    const usersItems = await getUsersItemsByUserIdAPI({ userId: user.id, token });
    const userItem = usersItems.find(userItem => userItem.ramenId == item.id);
    
    const newUserItem = await patchUserItemAPI({userItemId: userItem.id, token, count});
    console.log('newUserItem', newUserItem);
    setNeedToUpdatePrice(true);
  } 

  // const getUserItem = async () => {
  //   const usersItems = await getUsersItemsByUserIdAPI({ userId: user.id, token });
  //   const userItem = usersItems.find(userItem => userItem.ramenId == item.id);
  //   setUserItem(userItem);
  //   setCount(userItem.count);
  // }

  useEffect(() => {
    setCartItem();
  }, [count])

  return (
    <div className='checkoutItem' key={item.id ?? idx}>
      <span>Name: {item.name}</span>
      <span>Price: {item.price}</span>

      <div className='changeCountField' >
        <button
          type='button'
          onClick={() => {
            if (count > 1) {
              setCount(count - 1);
            }
          }}
        >-</button>
        <span>{count}</span>
        <button
          type='button'
          onClick={() => {
            setCount(count + 1);
          }}
        >+</button>
      </div>

      <button
        type="button"
        onClick={() => handleDelete(item.id)}
      >Delete</button>

    </div>
  )
}

export default CheckoutItem;