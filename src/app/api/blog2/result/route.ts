import {fetchCSR} from "@utils/api/fetchCSR";
import {fetchMultipartCSR} from "@utils/api/fetchMultipartCSR";
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const result = await fetchMultipartCSR({
    req: request,
    url: `${process.env.BACKEND_URL}/api/blog2/result`,
    formData: formData,
  });
  return result;
}

export async function PUT(request: NextRequest) {
  const formData = await request.formData();

  const result = await fetchMultipartCSR({
    req: request,
    url: `${process.env.BACKEND_URL}/api/blog2/result`,
    formData: formData,
  });
  return result;
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  return await fetchCSR({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog2/result?id=${id}`,
    req: request,
  });
}
