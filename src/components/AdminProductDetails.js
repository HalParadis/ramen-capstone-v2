import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteRamenFromAPI, getRamenByIdFromAPI, getUserByIdFromAPI, updateRamenFromAPI } from "../axios-services";

const AdminProductDetails = ({token, fetchRamen}) => {
  const params = useParams();
  const { productId } = params;

  const [errorMessage, setErrorMessage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  

  const history = useHistory();

  const fetchRamenById = async (productId) => {
    if(productId){
    const ramen = await getRamenByIdFromAPI(productId);
    setName(ramen.name);
    setPrice(ramen.price);
    setDescription(ramen.description);
    setBrand(ramen.brand);
    }
  }

const handleDelete = async (productId) => {
 const deleteRam = await deleteRamenFromAPI({id: productId, token})
 await fetchRamen()
 history.push('/admin/products')
}



const updateRamen = async () =>{
  console.log("It's entered")
  const newRam = await updateRamenFromAPI({id: productId, token, name, price, description, brand})
  console.log("newRam: ",newRam)
  if (newRam.error) {
    setErrorMessage(result.message);
    console.error(errorMessage)
  }
  else {
    setName(newRam.name);
    setPrice(newRam.price);
    setDescription(newRam.description);
    setBrand(newRam.brand);
    setIsEditMode(false);
    await fetchRamen()
  }
}

const handleSubmit = async (event) =>{
  event.preventDefault();
  await updateRamen()
  await fetchRamenById()
}

  useEffect(() => {
    fetchRamenById(productId);
  }, []);


  return <>
  {isEditMode? 
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
    name="description"
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
  <button type="submit">Submit</button>
</form>:
  <div>
      <h2>Name: {name} </h2>
      <h3>Price: {price} </h3>
      <h3>Brand: {brand} </h3>
      <p>Description: {description} </p>
      <button 
        type='button'
        onClick={() => setIsEditMode(!isEditMode)}
      >{
        isEditMode
          ? 'Exit Edit Mode'
          : 'Edit Ramen Info'
      }</button>
      <button type='submit' onClick={() => handleDelete(productId)}>
        Delete
      </button>
    </div>}
  </>
}

export default AdminProductDetails;