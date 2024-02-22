import axios from 'axios';

const API = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (response?.status === 401) {
    //   window.location.href = response.data.url
    // }
    return Promise.reject(error);
  },
);

export default API;