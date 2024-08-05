import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petsystem-back.onrender.com',
  withCredentials: true // Adicione esta linha para incluir os cookies nas requisições
});

export default api;
