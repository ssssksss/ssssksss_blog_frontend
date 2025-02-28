import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface IFetchCSR {
  req: NextRequest;
  url: string;
  body?: Record<string, any>;
  retry?: number;
  contentType?: string;
  next?: NextFetchRequestConfig;
  handleRevalidateTags?: string[];
  credentials?: boolean;
}

interface ResponseData {
  msg?: string;
  data?: any;
  statusCode: number;
}

export const fetchCSR = async ({
  req,
  url,
  body,
  contentType,
  credentials = false,
  retry = 1,
  next,
  handleRevalidateTags,
}: IFetchCSR): Promise<any> => {
  try {
    let accessToken = req.cookies.get("accessToken");
    const refreshToken = req.cookies.get("refreshToken");
    const res = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": contentType || "application/json",
        ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {}),
        ...(credentials ? {"Access-Control-Allow-Origin": "*"} : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      next: next,
    });
    if (res.status === 401 && refreshToken && retry > 0) {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/accessToken`,
        {
          method: "GET",
          headers: {
            Cookie: `${refreshToken?.name}=${refreshToken?.value}`,
          },
          credentials: "include",
        },
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        accessToken = data.data;
        // 쿠키를 응답 헤더에서 추출
        const setCookieHeader = refreshResponse.headers.get("Set-Cookie");
        if (setCookieHeader) {
          const newRes = await fetch(url, {
            method: req.method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // 새 액세스 토큰 사용
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
