import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/team-space/all-project`,
    isFallbackToErrorPage: false,
  });
  return result;
}

