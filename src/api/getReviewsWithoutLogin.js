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
        timeout: 300000,
      }
    );
    return response.data;
  } catch (error) {
    // 첫 번째 요청이 실패한 경우 한 번 더 시도
    console.error("First attempt failed, retrying...");

    try {
      const retryResponse = await axios.post(
        `${API_BASE_URL}/reviews`,
        {
          productPk: productPk,
          platform: platform,
          okkuId: okkuId,
        },
        {
          timeout: 300000,
        }
      );
      return retryResponse.data;
    } catch (retryError) {
      // 두 번째 시도도 실패한 경우, 에러를 다시 던짐
      console.error("Second attempt also failed");
      throw retryError;
    }
  }
};

export { getReviewsWithoutLogin };
