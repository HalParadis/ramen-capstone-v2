import React, { useEffect, useState } from "react";
import {
  getUsersItemsByUserIdAPI,
  patchUserItemAPI,
  deleteUserItemAPI,
} from "../axios-services";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

const CartItem = ({ item, token, user, fetchCartItems }) => {
  const [count, setCount] = useState(item.count);

  const setCartItem = async () => {
    const usersItems = await getUsersItemsByUserIdAPI({
      userId: user.id,
      token,
    });
    const userItem = usersItems.find((userItem) => userItem.ramenId == item.id);

    const updatedUserItem = await patchUserItemAPI({
      userItemId: userItem.id,
      token,
      count,
    });
  };

  const handleDelete = async (itemId) => {
    const dataUsersItems = await getUsersItemsByUserIdAPI({
      userId: user.id,
      token,
    });
    const { id } = dataUsersItems.find(
      (userItem) => userItem.ramenId == itemId
    );
    const deletedUserItem = await deleteUserItemAPI({ userItemId: id, token });
    await fetchCartItems();
  };

  useEffect(() => {
    setCartItem();
  }, [count]);

  return (
    <div className="cart-item" key={item.id ?? idx}>
      <div className="cart-item-name-and-price">
        <div>{item.name}</div>
        <div>Unit Price: {item.price}</div>
      </div>

      <div className="cart-item-buttons">
        <div className="change-count-field">
          <button
            className="change-count-field-button"
            type="button"
            onClick={() => {
              if (count > 1) {
                setCount(count - 1);
              }
            }}
          >
            -
          </button>
          <span className="product-count">{count}</span>
          <button
            className="change-count-field-button"
            type="button"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +
          </button>
        </div>

        <button type="button" onClick={() => handleDelete(item.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;
