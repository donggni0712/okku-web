import axios from "axios";
import api from "./api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getUserInfo = async (name, height, weight, form) => {
  try {
    const response = await api.patch(`/users`, {
      name: name,
      height: height,
      weight: weight,
      form: form,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getUserInfo };
