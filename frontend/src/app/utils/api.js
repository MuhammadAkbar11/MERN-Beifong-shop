import axios from 'axios';

const BASE_URL = '/api/v2';

const axiosApi = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosApi;
