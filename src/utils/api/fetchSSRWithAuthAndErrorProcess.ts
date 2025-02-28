"use server";
import { handleResponseError } from "@utils/error/handleResponseError";

interface IFetchSSRProps {
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  url: string;
  method?: string;
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
  contentType,
  next,
  bodyData,
  isRefreshNeeded = true,
  method = "GET",
  retries = 1,
  credentials,
  errorStatusCodeAndHandler = {},
}: IFetchSSRProps): Promise<any> => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": contentType || "application/json",
        ...(accessToken && {Authorization: `Bearer ${accessToken}`}),
        ...(credentials && {"Access-Control-Allow-Origin": "*"}),
      },
      credentials: credentials ? "include" : "omit",
      body: bodyData ? JSON.stringify(bodyData) : null,
      next: next,
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
  } catch (error: unknown) {
    let code = 500;
    let message = "서버 오류";

    try {
      if (error instanceof Error) {
        const _error = JSON.parse(error.message);
        // JSON parse가 된다는 의미는 서버에서 요청이 성공하였고 에러를 처리하는 과정
        code = _error.code ?? 500;
        message = _error.message ?? "서버 에러 메시지";
      }
    } catch (parseError) {}
    throw new Error(
      JSON.stringify({
        code: code,
        message: message,
      }),
    );
  }
};
