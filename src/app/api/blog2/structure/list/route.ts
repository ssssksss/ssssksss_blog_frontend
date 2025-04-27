import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const page = url.searchParams.get("page");
  return await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/blog2/basic/structure?search=${search}&page=${page}`,
    req: request,
    isFallbackToErrorPage: false,
  });
}
