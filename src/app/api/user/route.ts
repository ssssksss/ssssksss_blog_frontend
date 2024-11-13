import { fetchCSR } from "@utils/api/fetchCSR";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return await fetchCSR({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
    req: request,
  });
}

// 로그인 용도
export async function PUT(request: NextRequest) {
  const data = await request.json();
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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
