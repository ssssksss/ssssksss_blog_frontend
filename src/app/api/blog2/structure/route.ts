import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  return await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/blog2/structure`,
    req: request,
    body: data,
    isFallbackToErrorPage: false,
  });
}
export async function PUT(request: NextRequest) {
  const data = await request.json();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  return await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/blog2/structure/${id}`,
    req: request,
    body: data,
    isFallbackToErrorPage: false,
  });
}
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  return await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/blog2/structure/${id}`,
    req: request,
    isFallbackToErrorPage: false,
  });
}
