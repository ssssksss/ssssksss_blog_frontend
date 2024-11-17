// app/api/route.ts
import { fetchCSR } from "@utils/api/fetchCSR";
import { fetchMultipartCSR } from "@utils/api/fetchMultipartCSR";
import { NextRequest } from "next/server";

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

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const result = await fetchMultipartCSR({
    req: request,
    url: `${process.env.BACKEND_URL}/api/blog2/category/second`,
    formData: formData,
  });
  return result;
}

export async function PUT(request: NextRequest) {
  const formData = await request.formData();

  const result = await fetchMultipartCSR({
    req: request,
    url: `${process.env.BACKEND_URL}/api/blog2/category/second`,
    formData: formData,
  });
  return result;
}
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("deleteSecondCategoryId");
  return await fetchCSR({
    url: `${process.env.BACKEND_URL}/api/blog2/category/second?id=${id}`,
    req: request,
  });
}
