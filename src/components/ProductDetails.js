import React, { useEffect, useState } from 'react';
import { getRamenByIdFromAPI } from '../axios-services';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ProductDetails = () => {
  const params = useParams();
  const { productId } = params;
  const [ramen, setRamen] = useState(undefined);

  const fetchRamenById = async (id) => {
    const selectedRamen = await getRamenByIdFromAPI(id);
    setRamen(selectedRamen)
  }

  useEffect(() => {
    fetchRamenById(productId);
  }, []);

  return (
    <div>
      <h2>Name: {ramen && ramen.name} </h2>
      <h3>Price: {ramen && ramen.price} </h3>
      <h3>Brand: {ramen && ramen.brand} </h3>
      <p>Description: {ramen && ramen.description} </p>
      <button
        type='button'
      >Add To Cart</button>
    </div>
  )
}

export default ProductDetails;