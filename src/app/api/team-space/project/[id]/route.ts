import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/team-space/project/${id}`,
    isFallbackToErrorPage: false,
  });
  return result;
}