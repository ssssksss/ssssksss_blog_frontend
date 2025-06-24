import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const scheduleStartDate = searchParams.get("scheduleStartDate");
  const scheduleEndDate = searchParams.get("scheduleEndDate");

  return await fetchApiRoutes({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plan/schedule/list?scheduleStartDate=${scheduleStartDate}&scheduleEndDate=${scheduleEndDate}`,
    req: request,
    isFallbackToErrorPage: false,
  });
}