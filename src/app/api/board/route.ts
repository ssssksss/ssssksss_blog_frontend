import {fetchCSR} from "@utils/api/fetchCSR";
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  return await fetchCSR({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/board`,
    body: data,
    req: request,
  });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  return await fetchCSR({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/board`,
    body: data,
    req: request,
    handleRevalidateTags: [`getBoard/${id}`],
  });
}

// export async function GET(request: NextRequest) {
//   const url = new URL(request.url);
//   return await fetchCSR({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/board${new URLSearchParams(url.search)}`,
//     req: request,
//   });
// }

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  return await fetchCSR({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/board?id=${id}`,
    req: request,
  });
}
