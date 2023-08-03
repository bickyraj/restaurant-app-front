import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { EventEmitter } from "events";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import AuthService from "./AuthService";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventEmitter = new EventEmitter();

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful response
    if (response.status >= 200 && response.status < 300) {
    }
    NProgress.done();
    return response;
  },
  (error: AxiosError) => {
    NProgress.done();
    if (error.response?.status == 403) {
      const authService = new AuthService();
      authService.logout();
      location.href = "/login";
    } else {
      return Promise.reject(error);
    }
  }
);

api.interceptors.request.use((config: AxiosRequestConfig): any => {
  // Show the progress bar on each request
  NProgress.start();
  return config;
});

// Function to set the access token in the Axios headers and local storage
const setAccessToken = (accessToken: string) => {
  if (accessToken) {
    api.defaults.headers.common['access_token'] = `Bearer ${accessToken}`;
    localStorage.setItem('access_token', accessToken);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('access_token');
  }
};

// Function to get the access token from local storage
const getAccessToken = () => {
  return localStorage.getItem('access_token') || null;
};

export const emitNotification = (
  message: string,
  type: "success" | "error" | "warning"
) => {
  eventEmitter.emit("notification", message, type);
};

export { api, setAccessToken, getAccessToken };
