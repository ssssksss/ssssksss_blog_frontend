import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/team-space/task`,
    body: data,
    isFallbackToErrorPage: false,
  });
  return result;
}
export async function GET(request: NextRequest) {
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/team-space/task`,
    isFallbackToErrorPage: false,
  });
  return result;
}
export async function PUT(request: NextRequest) {
  const data = await request.json();
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/team-space/task`,
    body: data,
    isFallbackToErrorPage: false,
  });
  return result;
}
export async function PATCH(request: NextRequest) {
  const data = await request.json();
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/team-space/task`,
    body: data,
    isFallbackToErrorPage: false,
  });
  return result;
}
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/team-space/task/${id}`,
    isFallbackToErrorPage: false,
  });
  return result;
}