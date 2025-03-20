import { store } from "@/Redux/Store";
import axios from "axios";
import https from 'https';

const API = axios.create({
    baseURL: "http://35.154.240.227:5000",
    headers: {
        "Content-Type": "application/json",
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

API.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
