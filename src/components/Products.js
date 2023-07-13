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
      <div className='product-list'>
        {
          allRamen?.map((ramen, idx) => {
            return (
              <div className="each-product" key={ramen.id ?? idx}>
                <h3 className="ramen-name">Name: {ramen.name}</h3>
                <p className="ramen-price"> Price: {ramen.price}</p>
                <img src={ramen.imgURL} alt={`photo of ${ramen.name}`}/>
                {/* <h3>Picture:</h3> */}
              <div className='product-detail-link'>
                <Link to={`/products/${ramen.id}`}>
                  View Product Details
                </Link>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Products;