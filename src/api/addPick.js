import axios from "axios";
import api from "./api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const addPicks = async (url) => {
  try {
    const response = await api.post("/picks/new", {
      url: url,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding pick:", error);
    throw error;
  }
};

export { addPicks };
