const BASE_URL = "http://localhost:3000/api/";

export const fetchFromAPI = async (
  { body, endpoint, method, token }) => {
  try {
    const response = await fetch(
      BASE_URL + endpoint, {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      ...(body && { body: JSON.stringify(body) })
    }
    );
    const result = await response.json();
    console.log('fetchFromAPI result', result);
    return result;
  }
  catch (err) {
    console.error(err);
  }
}
