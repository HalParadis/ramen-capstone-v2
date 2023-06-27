import React, { useEffect } from 'react';
import { fetchFromAPI } from '../api';

const Products = ({
  allRamen,
  setAllRamen,
  fetchProducts
}) => {



  useEffect(() => {
    fetchProducts();
  }, [])


  return (
    <>
      {allRamen.map((ramen, idx) => {
        return <div key={ramen.id ?? idx}>
          <h3>Name: {ramen.name}</h3>
          <h3>Price: {ramen.price}</h3>
          <h3>Picture:</h3>

        </div>
      })}
    </>
  )
}

export default Products;