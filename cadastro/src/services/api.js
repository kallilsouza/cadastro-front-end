import axios from "axios";

import { getToken } from "./auth";

import authInterceptor from "./authInterceptor";

const api = axios.create({
  baseURL: "http://localhost:8000/api/"
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let newError = Object.assign({}, error);

    if (newError.response.status === 400) {
      if (
        newError.response.headers["content-type"].includes(
          "application/problem+json"
        )
      ) {
        newError.response.data.hasValidationErrors = true;
      }
    }
    return Promise.reject(newError);
  }
);

api.interceptors.response.use(undefined, authInterceptor(api));

export default api;