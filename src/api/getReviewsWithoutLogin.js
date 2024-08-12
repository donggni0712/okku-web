import axios from "axios";
import api from "./api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getReviewsWithoutLogin = async (url, okkuId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reviews`, {
      url: url,
      okkuId: okkuId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getReviewsWithoutLogin };
