import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL, 
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axiosClient.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
});

export default axiosClient;