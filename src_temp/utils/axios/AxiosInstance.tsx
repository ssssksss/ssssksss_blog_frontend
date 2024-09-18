import axios, { AxiosRequestConfig } from 'axios';
import useAuthStore from 'src/store/userStore';

const AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080'
      : 'https://blog-server.ssssksss.xyz',
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

AxiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;

    if (accessToken) {
      config.headers = config.headers ?? {};

      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }

      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const authStore = useAuthStore();
    const originalRequest = error.response.config;

    if (typeof originalRequest._retry === 'undefined') {
      originalRequest._retry = false;
    }

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      let existNewAccessToken = true;
      await AxiosInstance({
        url: '/api/user/accessToken',
        method: 'GET',
        withCredentials: true,
      })
        .then((res) => {
          authStore.setUser({
            accessToken: res.data.accessToken,
          });

          originalRequest.headers['Authorization'] =
            'Bearer ' + res.data.accessToken;
        })
        .catch(() => {
          existNewAccessToken = false;
        });

      if (existNewAccessToken) {
        return AxiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
