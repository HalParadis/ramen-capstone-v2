import React, { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductsAdmin = ({allRamen, fetchRamen}) =>{

  useEffect(() => {
    fetchRamen();
  }, [])

  return <>
   {allRamen.map((ramen, idx) => {
          return (
            <div key={ramen.id ?? idx}>
              <h3>Name: {ramen.name}</h3>
              <p>Price: {ramen.price}</p>
              <p>Brand: {ramen.brand}</p>
              <p>Description: {ramen.description}</p>
              <img src={ramen.imgURL} alt={`Photo of ${ramen.name}`}/>
              {/* <h3>Picture:</h3> */}
              <Link to={`/admin/products/${ramen.id}`}>
                View Product Details
              </Link>
              <hr></hr>
            </div>
          )
        })}
        <button><Link to="/admin/create">Add Product</Link></button>
        
  </>
}

export default ProductsAdmin;