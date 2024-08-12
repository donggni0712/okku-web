import axios from "axios";
import api from "./api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getReviews = async (pickId) => {
  try {
    const response = await api.get(`picks/reviews?pickId=${pickId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getReviews };
