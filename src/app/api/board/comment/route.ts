import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/board/comment`,
    body: data,
    isFallbackToErrorPage: false
  });
  return result;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const boardId = url.searchParams.get("boardId");

  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/board/comment?boardId=${boardId}`,
    isFallbackToErrorPage: false,
  });
  return result;
}

export async function PUT(request: NextRequest) {
  const data = await request.json();

  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/board/comment`,
    method: "PUT",
    body: data,
    isFallbackToErrorPage: false,
  });

  return result;
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/board/comment?id=${id}`,
    method: "DELETE",
    isFallbackToErrorPage: false,
  });

  return result;
}
