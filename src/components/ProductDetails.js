import React, { useEffect, useState } from "react";
import { postUserItemAPI } from "../axios-services";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

const ProductDetails = ({ selectedRamen, fetchRamenById, token }) => {
  const params = useParams();
  const history = useHistory();
  const { productId } = params;
  const [count, setCount] = useState(1);

  useEffect(() => {
    fetchRamenById(productId);
  }, []);

  return (
    <div className="product-details-page">
      <div className="product-details">
        <img
          className="product-page-img"
          src={selectedRamen && selectedRamen.imgURL}
        />
        <div className="product-all-but-img">
          <h2 className="product-page-name">
            {selectedRamen && selectedRamen.name}{" "}
          </h2>
          <h3 className="product-page-name">
            {selectedRamen && selectedRamen.brand}{" "}
          </h3>
          <p className="product-page-name">
            {selectedRamen && selectedRamen.description}{" "}
          </p>
          <h3 className="product-page-name">
            {selectedRamen && selectedRamen.price}{" "}
          </h3>
          <div className="count-and-add-to-cart">
            <div className="change-count-field">
              <button
                className="change-count-field-button"
                type="button"
                onClick={() => count > 1 && setCount(count - 1)}
              >
                -
              </button>
              <span className="product-count">{count}</span>
              <button
                className="change-count-field-button"
                type="button"
                onClick={() => !(count > 98) && setCount(count + 1)}
              >
                +
              </button>
            </div>
            <span>
              <button
                className="add-to-cart-button"
                type="button"
                onClick={() => {
                  postUserItemAPI({ count, token, ramenId: selectedRamen.id });
                  history.push("/cart");
                }}
              >
                Add To Cart
              </button>
              {/* <span className='noodle-emoji'>🍜</span> */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
