import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.43.209:3000/api', // Ganti dengan URL backend Anda
  timeout: 10000, // 10 detik timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
