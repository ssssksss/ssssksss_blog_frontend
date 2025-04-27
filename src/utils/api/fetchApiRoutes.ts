
import { handleResponseError } from "@utils/error/handleResponseError";
import clog from "@utils/logger/logger";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface IFetchApiRoutes {
  req?: NextRequest;
  url: string;
  body?: Record<string, any>;
  retry?: number;
  contentType?: undefined | "application/x-www-form-urlencoded";
  next?: NextFetchRequestConfig;
  handleRevalidateTags?: string[];
  credentials?: boolean;
  formData?: FormData;
  isAuth?: boolean; // 쿠키를 담아서 보낼 필요가 없을때는 false
  isFallbackToErrorPage?: boolean; // 에러가 발생하면 에러페이지로 처리를 할지 여부(default: true)
  cache?: RequestCache;
  accessToken?: Record<string, string>;
  refreshToken?: Record<string, string>;
  setCookieHeader?: string | null | undefined;
  method?: string;
}

interface ResponseData {
  msg?: string;
  data?: any;
  statusCode: number;
}

/** 
 * page.tsx에서 getData를 사용할 때 쿠키를 넣는 방법
 * const _accessToken = cookies().get("_accessToken");
 * const _refreshToken = cookies().get("_refreshToken");
 * headers: {
 *   ...(_accessToken?.value || _refreshToken?.value
 *     ? {
 *       Cookie: `_accessToken=${_accessToken?.value}; _refreshToken=${_refreshToken?.value}`,
 *     }
 *     : {}),
 * },
*/

// Next.js에 route.ts에 사용
export const fetchApiRoutes = async ({
  req,
  url,
  body,
  contentType,
  credentials = false,
  isFallbackToErrorPage = true,
  retry = 1,
  next,
  formData,
  handleRevalidateTags,
  isAuth = true,
  cache,
  accessToken,
  refreshToken,
  setCookieHeader,
  method,
}: IFetchApiRoutes): Promise<any> => {
  const _accessToken = accessToken || req?.cookies.get("accessToken");
  const _refreshToken = refreshToken || req?.cookies.get("refreshToken");
  let _setCookieHeader = setCookieHeader;

  // 기본은 json 형식, formData 인자를 받으면 multipart 형식
  let res = await fetch(url, {
    method: method || req?.method || "GET",
    headers: {
      ...(formData ? {} : {"Content-Type": contentType || "application/json"}),
      ...(isAuth && (_accessToken || _refreshToken)
        ? {Authorization: `Bearer ${_accessToken?.value || ""}`}
        : {}),
    },
    body: formData ? formData : body ? JSON.stringify(body) : undefined,
    next: next,
    ...(cache ? {cache} : isAuth ? {cache: "no-store"} : {}),
  });
  clog.info("fetchApiRoutes url: " + url);
  if (res.status == 401 && _refreshToken && retry > 0 && isAuth) {
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/accessToken`,
      {
        method: "GET",
        headers: {
          Cookie: `refreshToken=${_refreshToken.value}`,
        },
      },
    );
    if (refreshResponse.ok) {
      _setCookieHeader = refreshResponse.headers.get("Set-Cookie"); // 발급받은 액세스 토큰은 쿠키로 저장
      const refreshResult = await refreshResponse.json();
      const newAccessToken = refreshResult.data; // 응답 데이터로 받은 액세스 토큰 값은 API 재요청에 사용
      // 쿠키를 응답 헤더에서 추출
      if (_setCookieHeader) {
        return await fetchApiRoutes({
          req,
          url,
          body,
          contentType,
          credentials,
          isFallbackToErrorPage,
          retry: retry - 1,
          next,
          formData,
          handleRevalidateTags,
          isAuth,
          cache,
          accessToken: {name: "accessToken", value: newAccessToken},
          refreshToken,
          setCookieHeader: _setCookieHeader,
          method,
        });
      }
    } else {
      clog.info("토큰 발급 실패 이후 초기 API 토큰 없이 재요청");
      // 리프레시 토큰으로 성공하지 못했다면 기존 요청을 쿠키 없이 보내고 쿠키를 제거
      const initRes = NextResponse.json(await res.json(), {
        status: res.status,
      });
      initRes.cookies.set("accessToken", "", {maxAge: -1});
      initRes.cookies.set("refreshToken", "", { maxAge: -1 });
      return initRes;
    }
  }
  if (setCookieHeader) {
    res = NextResponse.json(await res.json(), {
      status: res.status,
      headers: {
        "Set-Cookie": setCookieHeader || "", // 쿠키 추가
      },
    });
  }
  if (isFallbackToErrorPage) {
    await handleResponseError(res);
  }
  await revalidateTags(handleRevalidateTags);
  return res;
};

const revalidateTags = async (tags?: string[]) => {
  if (tags?.length) {
    await Promise.all(tags.map((tag) => revalidateTag(tag)));
  }
};