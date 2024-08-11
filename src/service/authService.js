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
    clearStorageForCurrentPage();

    window.location.href = "/";

    throw error;
  }
};
const clearStorageForCurrentPage = () => {
  const prefix = "refreshToken"; // 현재 페이지에 관련된 로컬스토리지 키의 접두사

  // 로컬스토리지에서 해당 접두사로 시작하는 항목 삭제
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  });

  // // 세션스토리지에서 해당 접두사로 시작하는 항목 삭제
  // Object.keys(sessionStorage).forEach((key) => {
  //   if (key.startsWith(prefix)) {
  //     sessionStorage.removeItem(key);
  //   }
  // });
};

api.interceptors.request.use(
  async (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
