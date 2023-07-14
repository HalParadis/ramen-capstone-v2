import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createRamenFromAPI } from "../axios-services";

const AdminCreateProduct = ({ token, fetchRamen }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [imgURL, setImgURL] = useState("");
  const history = useHistory();

  const createProd = async () => {
    const newProd = await createRamenFromAPI({
      token,
      name,
      price,
      description,
      brand,
      imgURL,
    });
    return newProd;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createProd();
    await fetchRamen();
    history.push("/admin/products");
  };

  return (
    <>
    <div className="product-details-page">
      <form className="product-create-form" onSubmit={handleSubmit}>
        <label  htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <label htmlFor="price">Price</label>
        <input
          type="value"
          name="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="desscription"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          name="brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        />
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          name="image"
          value={imgURL}
          onChange={(event) => setImgURL(event.target.value)}
        />
        <div className="admin-create-button-container">
        <button className="admin-create-button" type="submit">Create</button>
        </div>
      </form>
      </div>
    </>
  );
};

export default AdminCreateProduct;
