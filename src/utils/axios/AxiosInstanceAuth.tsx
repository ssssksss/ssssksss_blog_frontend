import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import axios from 'axios';

const AxiosInstanceAuth = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080'
      : 'https://blog-server.ssssksss.xyz',
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// const setApiUserInfo = async () => {
//   await AxiosInstanceAuth({
//     url: '/api/user',
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${store.getState().authStore.accessToken}`,
//     },
//   })
//     .then((response: unknown) => {
//       store.dispatch(
//         rootActions.authStore.SET_USER_INFO(response.data.data.user),
//       );
//     })
//     .catch(() => {});
// };

// axios의 인터셉터라고 하여 axios에서 응답을 보내기전과 요청을 받은 후 처리를 해주는 로직을 작성할 수 있다.
AxiosInstanceAuth.interceptors.request.use(
  (config: unknown) => {
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

AxiosInstanceAuth.interceptors.response.use(
  (response: unknown) => {
    return response;
  },
  (error: unknown) => {
    if (error.response == null) {
      return;
    }
    const originalRequest = error.response?.config;
    if (error.response?.status == 777 && !originalRequest._retry) {
      originalRequest._retry = true; // 똑같은 api를 2번째 실행중인지 체크하는 용도로 사용
      let existNewAccessToken = true;
      AxiosInstanceAuth({
        url: '/api/user/accessToken',
        method: 'GET',
        withCredentials: true,
      })
        .then(async (res) => {
          store.dispatch(
            rootActions.authStore.SET_ACCESS_TOKEN(res.data.accessToken),
          );
          originalRequest.headers['Authorization'] =
            'Bearer ' + store.getState().authStore.accessToken;
          // await setApiUserInfo();
        })
        .catch(() => {
          existNewAccessToken = false;
        });
      if (existNewAccessToken) {
        originalRequest._retry = true;
        return AxiosInstanceAuth(originalRequest); // 기존에 실행했던 API를 다시 실행
      }
    } else if (error.response?.status == 888) {
      AxiosInstanceAuth({
        url: '/api/auth/user',
        method: 'GET',
        withCredentials: true,
      })
        .then(() => {
          if (store.getState().authStore.accessToken !== '') {
            // alert("로그인이 필요합니다.");
          }
          store.dispatch(
            rootActions.authStore.SET_USER_INFO({
              email: '',
              role: '',
              nickname: '',
            }),
          );
          store.dispatch(rootActions.authStore.SET_USER_INFO());
          store.dispatch(rootActions.authStore.SET_ACCESS_TOKEN());
          if (store.getState().authStore.id) {
            store.dispatch(
              rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
                type: 'error',
                message: '로그인이 필요합니다!!!!',
              }),
            );
          }
        })
        .catch(() => {});
    }
    return Promise.reject(error);
  },
);

export default AxiosInstanceAuth;
