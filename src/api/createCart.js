import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const createCart = async (name, pickIds) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/carts`, {
      name: name,
      pickIds: pickIds,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};

export { createCart };
