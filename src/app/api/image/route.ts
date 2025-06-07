import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/s3/image/single`,
    formData: formData,
    isFallbackToErrorPage: false,
  });
  return result;
}