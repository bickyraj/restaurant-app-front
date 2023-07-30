import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { EventEmitter } from "events";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const api = axios.create({
  // baseURL: "http://38.242.149.105:5000/api",
  baseURL: "http://javanitalab.com:5000/api",
  timeout: 10000, // Set a timeout for requests (optional)
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
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config: AxiosRequestConfig): any => {
  // Show the progress bar on each request
  NProgress.start();
  return config;
});

export const emitNotification = (
  message: string,
  type: "success" | "error" | "warning"
) => {
  eventEmitter.emit("notification", message, type);
};

export default api;
