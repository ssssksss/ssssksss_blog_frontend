import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/blog2`,
    formData: formData,
    isFallbackToErrorPage: false,
  });
  return result;
}

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const formData = await request.formData();
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/blog2/${id}`,
    formData: formData,
    isFallbackToErrorPage: false,
  });
  return result;
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  return await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/blog2?id=${id}`,
    req: request,
    isFallbackToErrorPage: false,
  });
}
