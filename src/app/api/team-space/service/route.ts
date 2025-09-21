import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/team-space/service`,
    body: data,
    isFallbackToErrorPage: false,
  });
  return result;
}
export async function GET(request: NextRequest) {
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/team-space/service`,
    isFallbackToErrorPage: false,
  });
  return result;
}