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
    <div>
      <h2>Name: {selectedRamen && selectedRamen.name} </h2>
      <h3>Price: {selectedRamen && selectedRamen.price} </h3>
      <h3>Brand: {selectedRamen && selectedRamen.brand} </h3>
      <p>Description: {selectedRamen && selectedRamen.description} </p>
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
      <button
        type='button'
        onClick={() => {
          postUserItemAPI({count, token, ramenId: selectedRamen.id})
          history.push('/cart');
        }}
      >Add To Cart</button>
    </div>
  )
}

export default ProductDetails;