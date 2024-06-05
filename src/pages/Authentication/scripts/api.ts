import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true // Adicione esta linha para incluir os cookies nas requisições
});

export default api;
