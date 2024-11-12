// app/api/route.ts
import {fetchCSR} from "@utils/api/fetchCSR";
import {NextRequest} from "next/server";

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
  const data = await request.json();
  const result = await fetchCSR({
    req: request,
    url: `${process.env.BACKEND_URL}/api/blog2/category/first`,
    body: data,
  });
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
