import React, { useEffect, useState } from 'react';
import { getUsersItemsByUserIdAPI, patchUserItemAPI, deleteUserItemAPI} from '../axios-services';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CartItem = ({
  item,
  token,
  user,
  fetchCartItems
}) => {
  const [count, setCount] = useState(item.count);
  
  const setCartItem = async () => {
    const usersItems = await getUsersItemsByUserIdAPI({ userId: user.id, token });
    const userItem = usersItems.find(userItem => userItem.ramenId == item.id);
    
    const updatedUserItem = await patchUserItemAPI({userItemId: userItem.id, token, count});
  } 

  const handleDelete = async (itemId) => {
    const dataUsersItems = await getUsersItemsByUserIdAPI({ userId: user.id, token });
    const { id } = dataUsersItems.find(userItem => userItem.ramenId == itemId);
    const deletedUserItem = await deleteUserItemAPI({ userItemId: id, token });
    console.log('deletedUserItem', deletedUserItem);
    await fetchCartItems();
  }

  useEffect(() => {
    setCartItem();
  }, [count])

  return (
    <div className='cartItem' key={item.id ?? idx}>
      <span>Name: {item.name}</span>
      <span>Unit Price: {item.price}</span>

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

export default CartItem;