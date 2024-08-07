import axios from "axios";
import useRefreshToken from "hooks/useRefreshToken";

const axiosClient = axios.create({
  baseURL:
    window.location.hostname.indexOf("localhost") > -1
      ? process.env.REACT_APP_BASE_API_URL
      : `${window.location.protocol}//${window.location.hostname}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await useRefreshToken();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    if (
      error.response.status === 402 &&
      window.location.pathname === "/dashboard"
    ) {
      return window.location.replace("/connect");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
