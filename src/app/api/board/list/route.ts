import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

// export async function POST(request: NextRequest) {
//   const data = await request.json();
//   return await fetchCSR({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plan/schedule`,
//     body: data,
//     req: request,
//   });
// }

// export async function PUT(request: NextRequest) {
//   const data = await request.json();
//   return await fetchCSR({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plan/schedule`,
//     body: data,
//     req: request,
//   });
// }

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  return await fetchApiRoutes({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/board/list${decodeURIComponent(url.search)}`,
    req: request,
    isAuth: false,
    isFallbackToErrorPage: false,
  });
}

// export async function DELETE(request: NextRequest) {
//   const url = new URL(request.url);
//   const id = url.searchParams.get("id");
//   return await fetchCSR({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plan/schedule?id=${id}`,
//     req: request,
//   });
// }
