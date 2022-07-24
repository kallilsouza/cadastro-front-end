import axios from "axios";

const REFRESH_URL = "http://localhost:8000/api/refresh/"

let isRefreshing = false;
let failedQueue = [];
let requestsLimit = 0;

const processQueue = (token = null) => {
  failedQueue.forEach((req) => {
    req.headers["Authorization"] = "Bearer " + token;
  });
  requestsLimit = 0;
  failedQueue = [];
};

const interceptor = (axiosInstance) => (error) => {
  const _axios = axiosInstance;
  let originalRequest = {};
  originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      failedQueue.push(originalRequest);
      requestsLimit++;
      if (requestsLimit > 50) return Promise.reject(error);
    }

    originalRequest._retry = true;
    isRefreshing = true;
    const refreshToken = localStorage.getItem("refreshToken");
    return new Promise((resolve, reject) => {
      axios
        .post(REFRESH_URL, {
          refresh: refreshToken,
        })
        .then((data) => {
          const token = data.data.access;
          localStorage.setItem("accessToken", token);
          _axios.defaults.headers["Authorization"] = "Bearer " + token;
          originalRequest.headers["Authorization"] = "Bearer " + token;
          processQueue(token);
          resolve(_axios(originalRequest));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  return Promise.reject(error);
};

export default interceptor;