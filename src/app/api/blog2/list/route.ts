// app/api/route.ts
import { fetchCSR } from "@utils/api/fetchCSR";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   return NextResponse.json({ message: 'Hello from GET' });
// }

// export async function POST(request: NextRequest) {
//   const accessToken = request.cookies.get('accessToken');
//   const refreshToken = request.cookies.get('refreshToken');
//   const body = await request.json();
//   const result = await fetch(`${process.env.BACKEND_URL}/api/blog2/category/first`, {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken?.value}`,
//     },
//     credentials: 'omit',
//     body: body ? JSON.stringify(body) : undefined,
//     cache: 'no-store',
//   });

//   console.log("route.ts 파일 : ",result);

//   return result;
// }

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const secondCategoryId = url.searchParams.get("secondCategoryId");
  const page = url.searchParams.get("page");
  let accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  let newAccessToken = "";

  let result;
  // 액세스토큰이 만료된 경우에는
  if (!accessToken && refreshToken) {
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
      request.cookies.set("accessToken", data.data);
      newAccessToken = data.data;
    } else {
      throw new Error("Failed to refresh access token");
    }
    result = await fetchCSR({
      req: request,
      url: `${process.env.BACKEND_URL}/api/blog2/list${url.search}`,
    });
    const response = NextResponse.json(await result.json());
    if (newAccessToken) {
      response.cookies.set("accessToken", newAccessToken); // 헤더로 전달
    }
    return response;
  } else {
    result = await fetch(
      `${process.env.BACKEND_URL}/api/blog2/list${url.search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
  return result;
}

// export async function UPDATE(request: NextRequest) {
//   const data = await request.json();
//   // 데이터 처리
//   return NextResponse.json({ message: 'Hello from POST', data });
// }

// export async function DELETE(request: NextRequest) {
//   const data = await request.json();
//   // 데이터 처리
//   return NextResponse.json({ message: 'Hello from POST', data });
// }
