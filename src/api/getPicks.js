import axios from "axios";
import api from "./api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getPicks = async (page = 1, size = 30, cartId = null) => {
  try {
    let url = `/picks?page=${page}&size=${size}`;
    if (cartId) {
      url = url + `&cartId=${cartId}`;
    }
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching picks:", error);
    throw error;
  }
};

export { getPicks };
