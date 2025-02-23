import useToastifyStore, { useToastifyStoreType } from "src/store/toastifyStore";
import useAuthStore, { useUserStoreType } from "src/store/userStore";
import { IFetchCSRProps } from "../@types/api/useFetchCSRHandler";



let errorFlag = false;
// 추가 작업을 위한 고차 함수
function withPostFetchAction(
  baseFetchHandler: (props: IFetchCSRProps) => Promise<any>,
  postAction?: (response: any) => void, // fetch가 끝난 후 실행할 콜백
  errorAction?: (response: any) => void, // fetch가 끝난 후 실행할 콜백
) {
  return async (props: IFetchCSRProps) => {
    try {
      const result = await baseFetchHandler(props);
      if (errorFlag == false && postAction) {
        // fetchCSR 후 성고시 추가 작업 (성공 시)
        postAction(result);
      } else if (errorFlag == true && errorAction) {
        errorAction(result);
      }

      return result;
    } catch (error) {
      throw error;
    }
  };
}

export function useFetchCSRHandler() {
  const toastifyStore = useToastifyStore() as useToastifyStoreType;
  const userStore = useAuthStore() as useUserStoreType;

  const baseFetchHandler = async ({
    accessToken,
    refreshToken,
    url,
    cache,
    contentType,
    next,
    bodyData,
    isRefreshNeeded = true,
    method = "GET",
    retries = 1,
    credentials = false,
    errorStatusCodeAndHandler = {},
  }: IFetchCSRProps): Promise<any> => {
    try {
      errorFlag = false;
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": contentType || "application/json",
          ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {}),
          ...(credentials ? {"Access-Control-Allow-Origin": "*"} : {}),
        },
        credentials: credentials ? "include" : "omit",
        body: bodyData ? JSON.stringify(bodyData) : null,
        cache: cache || "no-store",
      });
      if (response.status === 401 && isRefreshNeeded && retries > 0) {
        const response1 = await fetch("/api/user/accessToken");
        const data = await response1.json();
        // userStore.setUser({accessToken: data.accessToken});

        return await baseFetchHandler({
          accessToken: data.accessToken,
          refreshToken,
          url,
          cache,
          contentType,
          next,
          bodyData,
          isRefreshNeeded,
          method,
          retries: retries - 1,
          credentials: true,
        });
      }
      const result = await response.json();
      if (result.statusCode == 200) {
        toastifyStore.setToastify({type: "success", message: result.msg});
      } else if (result.statusCode >= 400) {
        errorFlag = true;
        toastifyStore.setToastify({type: "error", message: result.msg});
      }

      return result;
    } catch (error) {
      errorFlag = true;
    }
  };

  // 고차 함수로 fetchCSR에 후속 작업을 추가
  const fetchCSR = (
    props: IFetchCSRProps,
    postAction?: (response: any) => void,
    errorAction?: (response: any) => void,
  ) => withPostFetchAction(baseFetchHandler, postAction, errorAction)(props);

  return {fetchCSR, toastifyStore, userStore};
}


// 결과가 제대로 성공했을 경우 타입
interface ResponseData {
  status: number;
  statusText: string;
  headers: {
    vary: string;
    "x-content-type-options": string;
    "x-xss-protection": string;
    "cache-control": string;
    pragma: string;
    expires: string;
    "x-frame-options": string;
    "content-type": string;
    "transfer-encoding": string;
    date: string;
    "keep-alive": string;
    connection: string;
  };
  body: ReadableStream;
  bodyUsed: boolean;
  ok: boolean;
  redirected: boolean;
  type: string;
  url: string;
}


export const baseFetchHandler1 = async ({
  accessToken,
  refreshToken,
  url,
  cache,
  contentType,
  next,
  bodyData,
  isRefreshNeeded = true,
  method = "GET",
  retries = 1,
  credentials = false,
  errorStatusCodeAndHandler = {},
}: IFetchCSRProps): Promise<any> => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": contentType || "application/json",
        ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {}),
        ...(credentials ? {"Access-Control-Allow-Origin": "*"} : {}),
      },
      credentials: credentials ? "include" : "omit",
      body: bodyData ? JSON.stringify(bodyData) : null,
      cache: cache || "no-store",
    });
    if (response.status === 401 && isRefreshNeeded && retries > 0) {
      const response1 = await fetch("/api/user/accessToken");
      const result = await response1.json();

      return await baseFetchHandler1({
        accessToken: result.data,
        refreshToken,
        url,
        cache,
        contentType,
        next,
        bodyData,
        isRefreshNeeded,
        method,
        retries: retries - 1,
        credentials: true,
      });
    }
    
    return response;
  } catch (error) {
    errorFlag = true;
    return error;
  }
};