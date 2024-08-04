import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const addPicks = async (url) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/picks/new`, {
      url: url,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding pick:", error);
    throw error;
  }
};

export { addPicks };
