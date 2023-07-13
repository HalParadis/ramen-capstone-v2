import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteRamenFromAPI, deleteUserItemAPI, getRamenByIdFromAPI, getUserByIdFromAPI, getUsersItemsByRamenIdAPI, updateRamenFromAPI } from "../axios-services";

const AdminProductDetails = ({token, fetchRamen}) => {
  const params = useParams();
  const { productId } = params;

  const [errorMessage, setErrorMessage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [imgURL, setImgURL] = useState("")
  

  const history = useHistory();

  const fetchRamenById = async (productId) => {
    if(productId){
    const ramen = await getRamenByIdFromAPI(productId);
    setName(ramen.name);
    setPrice(ramen.price);
    setDescription(ramen.description);
    setBrand(ramen.brand);
    setImgURL(ramen.imgURL)
    }
  }

const handleDelete = async (productId) => {
  const userItems = await getUsersItemsByRamenIdAPI({id: productId, token});
  Promise.all(userItems.map(async (userItem) => {
    return await deleteUserItemAPI({ userItemId: userItem.id, token});
  }));
 const deleteRam = await deleteRamenFromAPI({id: productId, token})
 await fetchRamen()
 history.push('/admin/products')
 return deleteRam;
}



const updateRamen = async () =>{
  const newRam = await updateRamenFromAPI({id: productId, token, name, price, description, brand, imgURL})
  if (newRam.error) {
    setErrorMessage(result.message);
    console.error(errorMessage)
  }
  else {
    setName(newRam.name);
    setPrice(newRam.price);
    setDescription(newRam.description);
    setBrand(newRam.brand);
    setImgURL(newRam.imgURL)
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
  <label htmlFor="image">ImageURL</label>
  <input
    type="text"
    name="image"
    value={imgURL}
    onChange={(event) => setImgURL(event.target.value)}
  />
  <button type="submit">Submit</button>
</form>:
  <div>
      <h2>Name: {name} </h2>
      <h3>Price: {price} </h3>
      <h3>Brand: {brand} </h3>
      <p>Description: {description} </p>
      <img src={imgURL} alt={`Photo of ${name}`}/>
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