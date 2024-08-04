import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getCarts = async (page = 1, size = 10, cartId = null) => {
  let url = `${API_BASE_URL}/carts?page=${page}&size=${size}`;
  if (cartId) {
    url = url + `&cartId=${cartId}`;
  }
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw error;
  }
};

export { getCarts };
