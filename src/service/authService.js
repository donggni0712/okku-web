import api from "../api/api";

let accessToken = null;
let refreshToken = localStorage.getItem("refreshToken") || null;

const setTokens = (newAccessToken, newRefreshToken) => {
  accessToken = newAccessToken;
  refreshToken = newRefreshToken;
  localStorage.setItem("refreshToken", newRefreshToken);
};

const getAccessToken = () => accessToken;
const getRefreshToken = () => refreshToken;

const refreshAccessToken = async () => {
  try {
    const response = await api.post("/login/refresh", {
      refreshToken: getRefreshToken(),
    });
    setTokens(response.data.accessToken, response.data.refreshToken);
    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

api.interceptors.request.use(
  async (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log(accessToken);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export { setTokens, getAccessToken, getRefreshToken, refreshAccessToken };
