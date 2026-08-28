import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Endereço do seu backend local
});

export default api;
