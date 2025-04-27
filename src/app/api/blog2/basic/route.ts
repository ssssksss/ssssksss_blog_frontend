import { fetchCSR } from "@utils/api/fetchCSR";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const result = await fetchCSR({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog2/basic?id=${id}`,
    req: request,
  });
  return result;
}
