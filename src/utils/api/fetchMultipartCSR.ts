import clog from "@utils/logger/logger";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface IFetchCSR {
  req: NextRequest;
  url: string;
  formData?: FormData;
  retry?: number;
  next?: NextFetchRequestConfig;
  handleRevalidateTags?: string[];
}

interface ResponseData {
  msg?: string;
  data?: any;
  statusCode: number;
}

export const fetchMultipartCSR = async ({
  req,
  url,
  formData,
  retry = 1,
  next,
  handleRevalidateTags,
}: IFetchCSR): Promise<any> => {
  let accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  const res = await fetch(url, {
    method: req.method,
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
    credentials: "omit",
    body: formData,
    cache: "no-store",
  });
  clog.info(res);

  // Handle 401 error and token refresh
  if (res.status === 401 && refreshToken && retry > 0) {
    const refreshResponse = await fetch("/api/user/accessToken", {
      method: "GET",
      headers: {
        Cookie: `refreshToken=${refreshToken?.value}`,
      },
      credentials: "include",
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      accessToken = data.data;
      // 쿠키를 응답 헤더에서 추출
      const setCookieHeader = refreshResponse.headers.get("Set-Cookie");
      if (setCookieHeader) {
        const newRes = await fetch(url, {
          method: req.method,
          headers: {
            Authorization: `Bearer ${accessToken}`, // 새 액세스 토큰 사용
          },
          credentials: "include",
          body: formData,
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
      throw new Error("Failed to refresh access token");
    }
  }

  if (handleRevalidateTags?.length) {
    for (const tag of handleRevalidateTags) {
      await revalidateTag(tag); // 비동기 호출
    }
  }
  return res;
};
