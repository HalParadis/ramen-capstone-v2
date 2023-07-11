import React, { useEffect, useState } from 'react';
import { getRamenByIdFromAPI } from '../axios-services';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProductDetails = ({ 
  selectedRamen,
  fetchRamenById
}) => {
  const params = useParams();
  const history = useHistory();
  const { productId } = params;

  useEffect(() => {
    fetchRamenById(productId);
  }, []);

  return (
    <div>
      <h2>Name: {selectedRamen && selectedRamen.name} </h2>
      <h3>Price: {selectedRamen && selectedRamen.price} </h3>
      <h3>Brand: {selectedRamen && selectedRamen.brand} </h3>
      <p>Description: {selectedRamen && selectedRamen.description} </p>
      <button
        type='button'
        onClick={() => history.push('/cart')}
      >Add To Cart</button>
    </div>
  )
}

export default ProductDetails;