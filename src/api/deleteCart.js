import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const deleteCart = async (cartId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/carts/${cartId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error;
  }
};

export { deleteCart };
