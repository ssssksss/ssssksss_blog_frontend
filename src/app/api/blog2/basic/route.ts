import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  return await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/blog2/basic`,
    req: request,
    formData: formData,
    isFallbackToErrorPage: false,
  });
}
export async function PUT(request: NextRequest) {
  const formData = await request.formData();
  return await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/blog2/basic/${formData.get("id")}`,
    req: request,
    formData: formData,
    isFallbackToErrorPage: false,
  });
}
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  return await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/blog2/basic?id=${id}`,
    req: request,
    isFallbackToErrorPage: false,
  });
}
