import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createRamenFromAPI } from "../axios-services";

const AdminCreateProduct = ({token, fetchRamen}) =>{
  const [name, setName] = useState("")
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const history = useHistory()

  const createProd = async () =>{
    const newProd = await createRamenFromAPI({token, name, price, description, brand})
    return newProd;

  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createProd();
    await fetchRamen()
    history.push("/admin/products")
  }
  
  return <>
  <form onSubmit={handleSubmit}>
  <label htmlFor="name">Name</label>
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
  <button type="submit">Create</button>
</form>
  </>
}

export default AdminCreateProduct;