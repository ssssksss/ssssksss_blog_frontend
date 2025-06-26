import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/user`,
    req: request,
    isFallbackToErrorPage: false,
  });
}

// 로그인 용도
export async function PUT(request: NextRequest) {
  const data = await request.json();
  return await fetch(`${process.env.BACKEND_URL}/api/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({message: "로그아웃 완료"});

  // `NextResponse`의 `cookies`를 사용해 쿠키를 삭제합니다.
  response.cookies.set("accessToken", "", {maxAge: -1});
  response.cookies.set("refreshToken", "", {maxAge: -1});

  return response;
}
