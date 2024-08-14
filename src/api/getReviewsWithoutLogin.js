import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const getReviewsWithoutLogin = async (productPk, platform, okkuId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/reviews`,
      {
        productPk: productPk,
        platform: platform,
        okkuId: okkuId,
      },
      {
        timeout: 3000000,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getReviewsWithoutLogin };
