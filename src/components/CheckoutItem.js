import React, { useEffect, useState } from 'react';
import { getUsersItemsByUserIdAPI, patchUserItemAPI} from '../axios-services';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CheckoutItem = ({
  item,
  handleDelete,
  token,
  user
}) => {
  const [count, setCount] = useState('');
  const [userItem, setUserItem] = useState({});
  
  const changeCount = async (newCount) => {
    console.log('old count', count);
    setCount(newCount);
    console.log('new count', count);
    const newUserItem = await patchUserItemAPI({userItemId: userItem.id, token, count});
    console.log('newUserItem', newUserItem);
  } 

  const getUserItem = async () => {
    const usersItems = await getUsersItemsByUserIdAPI({ userId: user.id, token });
    const userItem = usersItems.find(userItem => userItem.ramenId == item.id);
    setUserItem(userItem);
  }

  useEffect(() => {
    getUserItem();
    setCount(userItem.count);
  }, [])

  return (
    <div className='checkoutItem' key={item.id ?? idx}>
      <span>Name: {item.name}</span>
      <span>Price: {item.price}</span>

      <div className='changeCountField' >
        <button
          type='button'
          onClick={() => count > 1 && changeCount(count - 1)}
        >-</button>
        <span>{count}</span>
        <button
          type='button'
          onClick={() => changeCount(count + 1)}
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