import { handleResponseError } from "@utils/error/handleResponseError";

interface IFetchSSRProps {
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  url: string;
  method?: string;
  cache?: RequestCache;
  contentType?: string;
  next?: NextFetchRequestConfig | undefined;
  retries?: number;
  bodyData?: object;
  isRefreshNeeded?: boolean;
  credentials?: boolean;
  errorStatusCodeAndHandler?: {
    [code: number]: {
      func: () => void;
    };
  };
}

export const fetchSSRWithAuthAndErrorProcess = async ({
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
}: IFetchSSRProps): Promise<any> => {
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
      const response1 = await fetch(
        `${process.env.BACKEND_URL}/api/user/accessToken`,
        {
          method: "GET",
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        },
      );
      const result = await response1.json();
      return await fetchSSRWithAuthAndErrorProcess({
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
    await handleResponseError(response);
    return response;
  } catch (error) {
    throw new Error(
      JSON.stringify({
        code: 500,
        message: "서버 오류",
      }),
    );
  }
};
