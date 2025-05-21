import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  return await fetchApiRoutes({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/board/list${decodeURIComponent(url.search)}`,
    req: request,
    isAuth: false,
    isFallbackToErrorPage: false,
  });
}