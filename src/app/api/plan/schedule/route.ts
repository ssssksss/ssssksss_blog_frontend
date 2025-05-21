import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  return await fetchApiRoutes({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plan/schedule`,
    body: data,
    req: request,
    isFallbackToErrorPage: false,
  });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  return await fetchApiRoutes({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plan/schedule`,
    body: data,
    req: request,
    isFallbackToErrorPage: false,
  });
}

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const scheduleStartDate = searchParams.get("scheduleStartDate");
  const scheduleEndDate = searchParams.get("scheduleEndDate");

  return await fetchApiRoutes({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plan/schedule?scheduleStartDate=${scheduleStartDate}&scheduleEndDate=${scheduleEndDate}`,
    req: request,
    isFallbackToErrorPage: false,
  });
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  return await fetchApiRoutes({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plan/schedule?id=${id}`,
    req: request,
    isFallbackToErrorPage: false,
  });
}
