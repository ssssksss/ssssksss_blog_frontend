import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/user/profile`,
    isFallbackToErrorPage: false,
    body: data
  });
  return result;
}