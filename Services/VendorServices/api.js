import axios from "axios";

// Create an Axios instance with default settings
const API = axios.create({
    baseURL: " https://7a50-39-38-112-90.ngrok-free.app", // Set your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor (optional: for authorization)
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token"); // Get token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach token to every request
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;