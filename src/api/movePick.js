import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const movePick = async (
  pickIds,
  sourceCartId,
  destinationCartId,
  isDeleteFromOrigin
) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/picks`, {
      pickIds: pickIds,
      sourceCartId: sourceCartId,
      destinationCartId: destinationCartId,
      isDeleteFromOrigin: isDeleteFromOrigin,
    });
    return response.data;
  } catch (error) {
    console.error("Error move picks:", error);
    throw error;
  }
};

export { movePick };
