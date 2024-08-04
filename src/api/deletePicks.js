import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const deletePicks = async (pickIds, cartId, isDeletePermenant) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/picks/delete`, {
      pickIds: pickIds,
      cartId: cartId,
      isDeletePermenant: isDeletePermenant,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting picks:", error);
    throw error;
  }
};

export { deletePicks };
