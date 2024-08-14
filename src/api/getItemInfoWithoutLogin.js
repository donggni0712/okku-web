import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getItemInfoWithoutLogin = async (url, okkuId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/scrape`, {
      url: url,
      okkuId: okkuId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getItemInfoWithoutLogin };
