import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteRamenFromAPI, deleteUserItemAPI, getRamenByIdFromAPI, getUserByIdFromAPI, getUsersItemsByRamenIdAPI, updateRamenFromAPI } from "../axios-services";

const AdminProductDetails = ({ token, fetchRamen }) => {
  const params = useParams();
  const { productId } = params;

  const [errorMessage, setErrorMessage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [imgURL, setImgURL] = useState("")


  const history = useHistory();

  const fetchRamenById = async (productId) => {
    if (productId) {
      const ramen = await getRamenByIdFromAPI(productId);
      setName(ramen.name);
      setPrice(ramen.price);
      setDescription(ramen.description);
      setBrand(ramen.brand);
      setImgURL(ramen.imgURL)
    }
  }

  const handleDelete = async (productId) => {
    const userItems = await getUsersItemsByRamenIdAPI({ id: productId, token });
    Promise.all(userItems.map(async (userItem) => {
      return await deleteUserItemAPI({ userItemId: userItem.id, token });
    }));
    const deleteRam = await deleteRamenFromAPI({ id: productId, token })
    await fetchRamen()
    history.push('/admin/products')
    return deleteRam;
  }



  const updateRamen = async () => {
    const newRam = await updateRamenFromAPI({ id: productId, token, name, price, description, brand, imgURL })
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateRamen()
    await fetchRamenById()
  }

  useEffect(() => {
    fetchRamenById(productId);
  }, []);


  return <div className="product-details-page">
    {isEditMode ?
      <form className='product-edit-form' onSubmit={handleSubmit}>

        <div className='product-edit-input-container'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div className='product-edit-input-container'>
          <label htmlFor="price">Price</label>
          <input
            type="value"
            name="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </div>

        <div className='product-edit-input-container'>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className='product-edit-input-container'>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          />
        </div>

        <div className='product-edit-input-container'>
          <label htmlFor="image">ImageURL</label>
          <input
            type="text"
            name="image"
            value={imgURL}
            onChange={(event) => setImgURL(event.target.value)}
          />
        </div>
        
        <button type="submit">Submit</button>
      </form> :
      <div className="product-details">
        <img
          className="product-page-img"
          src={imgURL}
        />
        <div className="product-all-but-img">
          <h2 className="product-page-name">
            {name}{" "}
          </h2>
          <h3 className="product-page-name">
            {brand}{" "}
          </h3>
          <p className="product-page-name">
            {description}{" "}
          </p>
          <h3 className="product-page-name">
            {price}{" "}
          </h3>

        </div>
      </div>}
    <div className='admin-edit-delete-buttons'>
      <button
        type='button'
        onClick={() => setIsEditMode(!isEditMode)}
      >{
          isEditMode
            ? 'Exit Edit Mode'
            : 'Edit Ramen Info'
        }
      </button>

      {!isDeleteMode && (
        <button type="button" onClick={() => setIsDeleteMode(true)}>
          Delete Item
        </button>
      )}
      {
        isDeleteMode && (
          <div className="delete-confirmation-container">
            Are You Sure? <span className='raised-eyebrow-emoji'>🤨</span>
            <span className="delete-confirmation-buttons">
              <button type="button" onClick={() => setIsDeleteMode(false)}>
                Cancel
              </button>
              <button type="button" onClick={() => handleDelete(productId)}>
                Delete
              </button>
            </span>
          </div>
        )
      }
    </div>
  </div>
}

export default AdminProductDetails;