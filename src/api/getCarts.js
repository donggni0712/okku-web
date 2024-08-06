import axios from "axios";
import api from "./api";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getCarts = async (page = 1, size = 10, cartId = null) => {
  let url = `/carts?page=${page}&size=${size}`;
  if (cartId) {
    url = url + `&cartId=${cartId}`;
  }
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw error;
  }
};

export { getCarts };
