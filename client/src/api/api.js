import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || BASE_URL,
    timeout: 5000,
});

api.interceptors.request.use(
    (config) => {
        const authStorage = localStorage.getItem("Auth-Storage");

        if (authStorage) {
            const parsedStorage = JSON.parse(authStorage);

            const token = parsedStorage?.state?.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;