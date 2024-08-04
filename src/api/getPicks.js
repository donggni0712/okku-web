import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getPicks = async (page = 1, size = 10) => {
  console.log(API_BASE_URL);
  try {
    const response = await axios.get(
      `${API_BASE_URL}/picks?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching picks:", error);
    throw error;
  }
};

export { getPicks };
