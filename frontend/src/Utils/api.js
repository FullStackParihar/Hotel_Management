 
import axios from 'axios';

// const API_URL = 'http://localhost:6969/';
const API_URL = 'https://hotel-management-1-8ktf.onrender.com';













const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


































api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default api;