import axios from "axios";
import api from "./api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const deleteCart = async (cartId) => {
  try {
    const response = await api.delete(`/carts/${cartId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error;
  }
};

export { deleteCart };
