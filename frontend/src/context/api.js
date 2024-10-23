import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:8000/api',
    baseURL: 'http://52.158.47.98:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;
