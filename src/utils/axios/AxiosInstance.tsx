import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080'
      : 'https://blog-server.ssssksss.xyz',
  //timeout: 1000,
  headers: {
    // 프론트엔드에서 Cors 문제를 해결하기 위한 방법
    // 아래 withCredentials하고 allow-Origin 정도만 해주면 프론트엔드에서 Cors문제는 해결되었다고 보면된다.
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

// axios의 인터셉터라고 하여 axios에서 응답을 보내기전과 요청을 받은 후 처리를 해주는 로직을 작성할 수 있다.
AxiosInstance.interceptors.request.use(
  (config: {headers: {[key: string]: string}, data: unknown}) => {
    // 리덕스에 저장된 accessToken을 가져와서 헤더에 넣어서 api를
    const accessToken = store.getState().authStore.accessToken;
    if (accessToken) {
      config.headers = config.headers ?? {};
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      } else {
        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

AxiosInstance.interceptors.response.use(
  (response: {
    data: {
      statusCode?: string;
      msg?: string;
      data?: unknown;
    };
  }) => {
    return response;
  },
  async (error: {
    response: { config: { _retry: boolean; headers: {[key:string] : string} }; status: number };
  }) => {
    const originalRequest = error.response.config;
    if (typeof originalRequest._retry === 'undefined') {
      originalRequest._retry = false;
    }
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // 똑같은 api를 2번째 실행중인지 체크하는 용도로 사용
      let existNewAccessToken = true;
      await AxiosInstance({
        url: '/api/user/accessToken',
        method: 'GET',
        withCredentials: true,
      })
        .then(async (res) => {
          store.dispatch(
            rootActions.authStore.SET_ACCESS_TOKEN(res.data.accessToken),
          );
          originalRequest.headers['Authorization'] =
            'Bearer ' + res.data.accessToken;
        })
        .catch(() => {
          existNewAccessToken = false;
        });
      if (existNewAccessToken) {
        return AxiosInstance(originalRequest); // 기존에 실행했던 API를 다시 실행
      }
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
