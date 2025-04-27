import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  return await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/blog2/category/second`,
    formData: formData,
  });
}

export async function PUT(request: NextRequest) {
  const formData = await request.formData();

  return await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/blog2/category/second`,
    formData: formData,
  });
}
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("deleteSecondCategoryId");
  return await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/blog2/category/second?id=${id}`,
    req: request,
    isFallbackToErrorPage: false,
  });
}