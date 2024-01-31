import axios from 'axios';

export const getBaseUrl = () => localStorage.getItem('apiUrl') || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
});

export const updateBaseUrl = (newUrl) => {
  axiosInstance.defaults.baseURL = newUrl;
};

export default axiosInstance;
