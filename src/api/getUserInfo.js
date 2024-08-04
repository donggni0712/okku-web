import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching userInfo:", error);
    throw error;
  }
};

export { getUserInfo };
