// axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,                  
  withCredentials: false            
});

export default api;
