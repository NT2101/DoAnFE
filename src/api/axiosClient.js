import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: 'https://localhost:7109/api/',
    headers: {
        'Content-Type': 'application/json'
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        // "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
    },
    // method: 'GET',
    // mode: 'no-cors',

    // withCredentials: true,xxxxxxx
    // credentials: 'same-origin',
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});