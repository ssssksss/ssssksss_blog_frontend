import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface IFetchCSR {
  req: NextRequest;
  url: string;
  body?: Record<string, any>;
  retry?: number;
  contentType?: undefined | "application/x-www-form-urlencoded";
  next?: NextFetchRequestConfig;
  handleRevalidateTags?: string[];
  credentials?: boolean;
  formData?: FormData;
  isAuth?: boolean; // 쿠키를 담아서 보낼 필요가 없을때는 false
  cache?: RequestCache;
}

interface ResponseData {
  msg?: string;
  data?: any;
  statusCode: number;
}

// Next.js에 route.ts에 사용
export const fetchCSR = async ({
  req,
  url,
  body,
  contentType,
  credentials = false,
  retry = 1,
  next,
  formData,
  handleRevalidateTags,
  isAuth = true,
  cache,
}: IFetchCSR): Promise<any> => {
  try {
    const accessToken = req.cookies.get("accessToken");
    const refreshToken = req.cookies.get("refreshToken");
    // 기본은 json 형식, formData 인자를 받으면 multipart 형식
    const res = await fetch(url, {
      method: req.method || "GET",
      headers: {
        ...(formData
          ? {}
          : {"Content-Type": contentType || "application/json"}),
        ...(isAuth && accessToken
          ? {Authorization: `Bearer ${accessToken.value}`}
          : {}),
      },
      body: formData ? formData : body ? JSON.stringify(body) : undefined,
      ...(next ? {next} : cache ? {cache} : isAuth ? {cache: "no-store"} : {}),
    });
    if (res.status === 401 && refreshToken && retry > 0) {
      // 리프레시 토큰을 이용하여 액세스 토큰을 재발급
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/accessToken`,
        {
          method: "GET",
          headers: {
            Cookie: `refreshToken=${refreshToken.value}`,
          },
        },
      );
      if (refreshResponse.ok) {
        const setCookieHeader = refreshResponse.headers.get("Set-Cookie"); // 발급받은 액세스 토큰은 쿠키로 저장
        const data = await refreshResponse.json();
        const newAccessToken = data.data; // 응답 데이터로 받은 액세스 토큰 값은 API 재요청에 사용
        // 쿠키를 응답 헤더에서 추출
        if (setCookieHeader) {
          const newRes = await fetch(url, {
            method: req.method,
            headers: {
              ...(formData
                ? {}
                : {"Content-Type": contentType || "application/json"}),
              ...(isAuth && newAccessToken
                ? {Authorization: `Bearer ${newAccessToken}`}
                : {}),
            },
            credentials: "include",
            body:
              req.method !== "DELETE" && body
                ? JSON.stringify(body)
                : undefined,
            cache: "no-store",
          });

          // Set-Cookie 헤더를 포함하여 새 응답 반환
          const responseWithCookies = NextResponse.json(await newRes.json(), {
            status: newRes.status,
            headers: {
              "Set-Cookie": setCookieHeader || "", // 쿠키 추가
            },
          });

          return responseWithCookies; // 쿠키가 포함된 응답 반환
        }
      } else {
        return {
          status: 403,
          message: "권한 없음",
        };
      }
    }

    if (handleRevalidateTags?.length) {
      for (const tag of handleRevalidateTags) {
        await revalidateTag(tag); // 비동기 호출
      }
    }
    return res;
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
