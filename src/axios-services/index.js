import axios from "axios";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAllRamenFromAPI() {
  try {
    const { data: ramen } = await axios.get("/api/ramen");
    return ramen;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getAllUsersFromAPI() {
  try{
    const { data: users } = await axios.get("/api/users");
    return users;
  } catch(err) {
    console.error(err)
  }
}

export async function getRamenByIdFromAPI(id) {
  try {
    const { data: ramen } = await axios.get(`/api/ramen/${id}`);
    return ramen;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getAdminRamenByIdFromAPI(id) {
  try {
    const { data: ramen } = await axios.get(`/api/ramen/${id}`);
    return ramen;
  } catch (err) {
    console.error(err);
  }
}

export async function updateRamenFromAPI({id, token, ...body}) {
  try {
    const headers = { 
      'Authorization': `Bearer ${token}`
  };
  console.log("id: ", id)
    const { data: ramen } = await axios.patch(`/api/ramen/update/${id}`, {...body} ,  {headers})  
    return ramen;
  } catch (error){
    console.error(error)
  }
}

export function deleteRamenFromAPI({id, token}) {
  try {
    const headers = { 
      'Authorization': `Bearer ${token}`
  };
    const { data: ramen } = axios.delete(`/api/ramen/delete/${id}`, { headers })
    return ramen;
  } catch (error){
    console.error(error?.response?.data);
    console.log(error)
    return error?.response?.data;
  }
}

export function createRamenFromAPI({ token, ...body}) {
  try {
    const headers = { 
      'Authorization': `Bearer ${token}`
  };
    const { data: ramen } = axios.post('/api/ramen/create',{...body}, { headers })
    return ramen;
  } catch (error){
    console.error(error)
  }
}

export async function loginAPI({ username, password }) {
  try {
    const { data } = await axios.post(`/api/users/login`, {
      username,
      password
    });
    return data;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function registerAPI({ username, password, email, address }) {
  try {
    const { data } = await axios.post(`/api/users/register`, {
      username,
      password,
      email,
      address
    });
    return data;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getUserByIdAPI({userId, token}) {
  try {
    const { data } = await axios.get(
      `/api/users/${userId}`, 
      {headers: { Authorization: `Bearer ${token}` }}
    );
    return data;
  }
  catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function patchUserAPI({userId, token, ...bodyData}) {
  try {
    const { data } = await axios.patch(
      `/api/users/${userId}`, 
      {...bodyData},
      {headers: { Authorization: `Bearer ${token}` }}
    );
    console.log(data);
    return data;
  }
  catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function deleteUserAPI({userId, token}) {
  try { 
    const { data } = await axios.delete(
      `/api/users/${userId}`, 
      {headers: { Authorization: `Bearer ${token}` }}
    );
    console.log('data:', data);
    return data;  
  }
  catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getUsersItemsByUserIdAPI({userId, token}) {
  try {
    const { data: usersItems } = await axios.get(
      `/api/users_items/${userId}`,
      {headers: { Authorization: `Bearer ${token}` }}
      );
      console.log("axios cart items: ", usersItems)
    return usersItems;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getUsersItemsByRamenIdAPI({id, token}) {
  try{
    const {data: usersItems} = await axios.get(`/api/users_items/ramen/${id}`, {headers: { Authorization: `Bearer ${token}` }})
    console.log("usersItems axios: ", usersItems)
    return usersItems;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function patchUserItemAPI({userItemId, token, ...bodyData}) {
  try {
    const { data: updateCount } = await axios.patch(
      `/api/users_items/${userItemId}`, 
      {...bodyData},
      {headers: { Authorization: `Bearer ${token}` }}
      );
      console.log("updateCount: ", updateCount);
    return updateCount;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function deleteUserItemAPI({userItemId, token}) {
  try {
    const { data: deleteData } = await axios.delete(
      `/api/users_items/${userItemId}`,
      {headers: { Authorization: `Bearer ${token}` }}
      );
      console.log("deleteData: ", deleteData)
    return deleteData;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function postUserItemAPI({ramenId, count, token}) {
  try {
    const { data: newUserItem } = await axios.post(
      `/api/users_items/${ramenId}`,
      { count },
      {headers: { Authorization: `Bearer ${token}` }}
      );
      console.log(" Added item: ", newUserItem)
    return newUserItem;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getUserByIdFromAPI({id, token}) {
  try {
    const { data: user} = await axios.get(
      `/api/users/${id}`,
      {headers: { Authorization: `Bearer ${token}` }}
      );
    return user;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}


export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}
