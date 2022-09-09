import { store } from "@/redux/store";
import { setAccessToken, setUserInfo } from "@/redux/store/auth";
import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://blog-server.ssssksss.xyz",
  //timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    // 프론트엔드에서 Cors 문제를 해결하기 위한 방법
    // 아래 withCredentials하고 allow-Origin 정도만 해주면 프론트엔드에서 Cors문제는 해결되었다고 보면된다.
    "Access-Control-Allow-Origin": "*",
  },
  // 프론트 엔드에서 withCredentials을 해주지 않는다면
  // 쿠키가 저장이 되지 않는다. 그리고 백엔드에서도 withCredentials을 true로 설정을 해주어야한다.
  withCredentials: true,
});

// axios의 인터셉터라고 하여 axios에서 응답을 보내기전과 요청을 받은 후 처리를 해주는 로직을 작성할 수 있다.
AxiosInstance.interceptors.request.use(
  (config: any) => {
    // 리덕스에 저장된 accessToken을 가져와서 헤더에 넣어서 api를
    const accessToken = store.getState().authStore.accessToken;
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      };
    }
    return config;
  },
  (error) => {
    console.log("request interceptor 시작");
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    if (error.response.data.statusCode === 406) {
      // 1. 리프레시 토큰이 없는 경우 - 406
      // 2. 리프레시 토큰이 문제가 있는 경우(미구현)
      // 3. 접근 권한이 없는 경우(미구현)
    } else {
      const originalRequest = error.config;
      if (
        !originalRequest._retry &&
        (error.response.data.status === 401 ||
          error.response.data?.statusCode === 401)
      ) {
        console.log("리프레쉬 토큰을 이용해서 엑세스 토큰을 재발급 합니다.");
        originalRequest._retry = true; // 똑같은 api를 2번째 실행중인지 체크
        let existNewAccessToken = true;
        await AxiosInstance({
          url: "/api/user/accessToken",
          method: "GET",
        })
          .then(async (res) => {
            console.log("새로운 액세스 토큰 받아와서 리덕스에 저장 중");
            // 리덕스에 accessToken 보관
            store.dispatch(setAccessToken(res.data.accessToken));
            // console.log(store.getState().auth.accessToken);
            // 헤더에 새로운 accessToken 넣어서 다시 api 실행
            originalRequest.headers["Authorization"] =
              "Bearer " + store.getState().authStore.accessToken;

            await AxiosInstance({
              url: "/api/user",
              method: "GET",
              headers: {
                Authorization: `Bearer ${
                  store.getState().authStore.accessToken
                }`,
              },
            })
              .then((response) => {
                store.dispatch(setUserInfo(response.data.data.user));
              })
              .catch((error) => {});
          })
          .catch((err) => {
            existNewAccessToken = false;
            console.log("refreshToken 재발급 진행 실패");
          });
        if (existNewAccessToken) {
          return axios(originalRequest); // 기존에 실행했던 API를 다시 실행
        }
      }
    }
    //토큰 만료 에러가 발생하면 로그인 페이지로 이동시키게 한다.
    return Promise.reject(error);
  }
);

export default AxiosInstance;
