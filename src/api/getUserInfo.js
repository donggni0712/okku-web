import axios from "axios";
import api from "./api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getUserInfo = async () => {
  try {
    const response = await api.get(`/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getUserInfo };
