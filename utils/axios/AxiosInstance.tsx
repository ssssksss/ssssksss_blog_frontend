import { store } from '@/redux/store';
import { setAccessToken, setUserInfo } from '@/redux/store/auth';
import axios from 'axios';
import SocialButton from '../../src/components/common/button/SocialButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/reducers';

const AxiosInstance = axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: 'https://blog-server.ssssksss.xyz',
  //timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    // 프론트엔드에서 Cors 문제를 해결하기 위한 방법
    // 아래 withCredentials하고 allow-Origin 정도만 해주면 프론트엔드에서 Cors문제는 해결되었다고 보면된다.
    'Access-Control-Allow-Origin': '*',
  },
  // 프론트 엔드에서 withCredentials을 해주지 않는다면
  // 쿠키가 저장이 되지 않는다. 그리고 백엔드에서도 withCredentials을 true로 설정을 해주어야한다.
  withCredentials: true,
});

const setApiUserInfo = async () => {
  await AxiosInstance({
    url: '/api/user',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.getState().authStore.accessToken}`,
    },
  })
    .then((response: any) => {
      store.dispatch(setUserInfo(response.data.data.user));
    })
    .catch(error => {});
};

// axios의 인터셉터라고 하여 axios에서 응답을 보내기전과 요청을 받은 후 처리를 해주는 로직을 작성할 수 있다.
AxiosInstance.interceptors.request.use(
  (config: any) => {
    // 리덕스에 저장된 accessToken을 가져와서 헤더에 넣어서 api를
    const accessToken = store.getState().authStore.accessToken;
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // 똑같은 api를 2번째 실행중인지 체크하는 용도로 사용
      let existNewAccessToken = true;
      AxiosInstance({
        url: '/api/user/accessToken',
        method: 'GET',
      })
        .then(async res => {
          store.dispatch(setAccessToken(res.data.accessToken));
          originalRequest.headers['Authorization'] =
            'Bearer ' + store.getState().authStore.accessToken;
          await setApiUserInfo();
        })
        .catch(err => {
          existNewAccessToken = false;
        });
      if (existNewAccessToken) {
        originalRequest._retry = true;
        return AxiosInstance(originalRequest); // 기존에 실행했던 API를 다시 실행
      }
    } else if (error.response.status === 406) {
      console.log('AxiosInstance.tsx : ', '리프레시토큰 만료');
      AxiosInstance({
        url: '/api/user',
        method: 'DELETE',
      })
        .then(response => {
          if (store.getState().authStore.accessToken !== '') {
            // alert("로그인이 필요합니다.");
          }
          store.dispatch(
            setUserInfo({
              email: '',
              role: '',
              nickname: '',
            })
          );
          store.dispatch(setAccessToken({ accessToken: '' }));
        })
        .catch(error => {});
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
