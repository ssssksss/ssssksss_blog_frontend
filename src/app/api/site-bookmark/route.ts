import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/site-bookmark`,
    isFallbackToErrorPage: false,
    body: data,
  });
  return result;
}

// export async function PUT(request: NextRequest) {
//   const formData = await request.formData();
//   const url = new URL(request.url);
//   const id = url.searchParams.get("id");
//   const result = await fetchApiRoutes({
//     req: request,
//     url: `${process.env.BACKEND_URL}/api/blog2`,
//     formData: formData,
//     isFallbackToErrorPage: false,
//   });
//   return result;
// }

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const result = await fetchApiRoutes({
    req: request,
    url: `${process.env.BACKEND_URL}/api/site-bookmark/${id}`,
    isFallbackToErrorPage: false,
  });
  return result;
}
