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
  } catch (err) {
    console.error(err);
  }
}

export async function getRamenByIdFromAPI(id) {
  try {
    const { data: ramen } = await axios.get(`/api/ramen/${id}`);
    return ramen;
  } catch (err) {
    console.error(err);
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
    console.error("error: ", error);
    return error;
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
    console.error(error);
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
