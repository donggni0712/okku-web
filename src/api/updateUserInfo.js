import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getUserInfo = async (name, height, weight, form) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/users`, {
      name: name,
      height: height,
      weight: weight,
      form: form,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating userInfo:", error);
    throw error;
  }
};

export { getUserInfo };
