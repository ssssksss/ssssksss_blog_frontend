import {fetchCSR} from "@utils/api/fetchCSR";
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  return await fetchCSR({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/youtube/playlist`,
    body: data,
    req: request,
  });
}

export async function GET(request: NextRequest) {
  return await fetchCSR({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/youtube/playlist`,
    req: request,
  });
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  return await fetchCSR({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/youtube/playlist?id=${id}`,
    req: request,
  });
}
