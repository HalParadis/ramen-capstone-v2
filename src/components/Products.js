import React, { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Products = ({
  allRamen,
  fetchRamen
}) => {

  useEffect(() => {
    fetchRamen();
  }, [])


  return (
    <>
      {
        allRamen.map((ramen, idx) => {
          return (
            <div key={ramen.id ?? idx}>
              <h3>Name: {ramen.name}</h3>
              <p>Price: {ramen.price}</p>
              {/* <h3>Picture:</h3> */}

              <Link to={`/products/${ramen.id}`}>
                View Product Details
              </Link>
              <hr></hr>
            </div>
          )
        })
      }
    </>
  )
}

export default Products;