import axios from "axios";
import api from "./api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getPicks = async (page = 1, size = 10) => {
  try {
    const response = await api.get(`/picks?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching picks:", error);
    throw error;
  }
};

export { getPicks };
