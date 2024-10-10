// services/apiService.js
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:3000'
});

export default apiService;
