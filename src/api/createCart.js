import api from "./api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const createCart = async (name, pickIds) => {
  try {
    const response = await api.post(`/carts`, {
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
