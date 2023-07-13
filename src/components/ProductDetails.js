import React, { useEffect, useState } from 'react';
import { postUserItemAPI } from '../axios-services';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProductDetails = ({ 
  selectedRamen,
  fetchRamenById,
  token
}) => {
  const params = useParams();
  const history = useHistory();
  const { productId } = params;
  const [count, setCount] = useState(1);

  useEffect(() => {
    fetchRamenById(productId);
  }, []);

  return (
    <div className='product-details'>
      <h2><span className='product-info'>Name: </span>{selectedRamen && selectedRamen.name} </h2>
      <h3><span className='product-info'>Price: </span>{selectedRamen && selectedRamen.price} </h3>
      <h3><span className='product-info'>Brand: </span>{selectedRamen && selectedRamen.brand} </h3>
      <p><span className='product-info'>Description: </span>{selectedRamen && selectedRamen.description} </p>
      <img src={selectedRamen && selectedRamen.imgURL} />

      <div className='changeCountField' >
        <button
          type='button'
          onClick={() => count > 1 && setCount(count - 1)}
        >-</button>
        <span>{count}</span>
        <button
          type='button'
          onClick={() => setCount(count + 1)}
        >+</button>
      </div>
      <span>
      <button className='add-to-cart-button'
        type='button'
        onClick={() => {
          postUserItemAPI({count, token, ramenId: selectedRamen.id})
          history.push('/cart');
        }}
      >Add To Cart</button>
      <span className='noodle-emoji'>🍜</span>
      </span>
    </div>
  )
}

export default ProductDetails;