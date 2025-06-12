// app/api/route.ts
import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const result = await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/blog2/list/admin${url.search}`,
    req: request,
    isFallbackToErrorPage: false,
  });
  return result;
}