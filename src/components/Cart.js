// import React, { useState, useEffect, } from 'react';
// import { useParams, useHistory, Link } from 'react-router-dom';

// import {
//   getRamenByIdFromAPI,
//   deleteRamenByIdFromAPI,
//   updateRamenByIdFromAPI
// } from '../axios-services';

// const Cart = ({
//   token,
//   fetchRamen,
//   username
// }) => {
//   const [cartItem, setCartItem] = useState('');
//   const { actionType } = useParams();
//   const history = useHistory();

//   const fetchCart = async (id) => {
//     const dataRamenById = await getRamenByIdFromAPI(id);
//     setCartItem(dataRamenById);
//   }

//   const handleDelete = async (event) => {
//     event.preventDefault();
//     const result = await deleteRamenByIdFromAPI();
//   }


//   useEffect(() => {
//     fetchCart(id);
//   }, []);



//   return (
//     <>
//       <h2>{username}'s Cart</h2>

//       {
//         cartItem.map((item, idx) => {
//           return (
//             <div key={item.id ?? idx}>
//               <h3>Name: {item.name}</h3>
//               <p>Price: {item.price}</p>
//               <p>Description: {item.description}</p>
//               <h3>Count: {item.count}</h3>

//               <button
//                 type="button"
//                 onClick={handleDelete}
//               >Delete</button>
//             </div>
//           )
//         })
//       };

//       <button
//         type="button"
//         onClick={() => history.push('/checkout')}
//       >Checkout</button>

//     </>
//   )
// }

// export default Cart;