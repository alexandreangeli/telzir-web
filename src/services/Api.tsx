import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  // baseURL: 'https://be-the-hero-back-end.herokuapp.com/'
  baseURL: "http://localhost:5000/",
});

export function setApiInterceptors(setLoadingContextValue: Function) {
  api.interceptors.request.use(
    (config) => {
      setLoadingContextValue(true);
      return config;
    },
    (error) => {
      toast.error(error.response?.data || error.message);
      setLoadingContextValue(false);
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (response) => {
      setLoadingContextValue(false);
      return response;
    },
    (error) => {
      toast.error(error.response?.data || error.message);
      setLoadingContextValue(false);
      return Promise.reject(error);
    }
  );
}
