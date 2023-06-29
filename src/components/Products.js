import React, { useEffect, useState } from 'react';
import { getRamenByIdFromAPI } from '../axios-services';

const Products = ({
  allRamen,
  fetchRamen
}) => {
  const [selectedRamen, setSelectedRamen] = useState({});

  const fetchRamenById = async (id) => {
    const ramen = await getRamenByIdFromAPI(id);
    console.log('ramen: ', ramen);
    setSelectedRamen(ramen)
  }

  useEffect(() => {
    fetchRamen();
    fetchRamenById(1);
  }, [])


  return (
    <>
      {allRamen.map((ramen, idx) => {
        return <div key={ramen.id ?? idx}>
          <h3>Name: {ramen.name}</h3>
          <h3>Price: {ramen.price}</h3>
          {/* <h3>Picture:</h3> */}
          <hr></hr>
        </div>
      })}

      <h2>Ramen with id 2:</h2>
      <h3>Name: {selectedRamen.name} </h3>
      <h3>Price: {selectedRamen.price} </h3>
      <h3>Brand: {selectedRamen.brand} </h3>
      <p>Description: {selectedRamen.description} </p>
    </>
  )
}

export default Products;