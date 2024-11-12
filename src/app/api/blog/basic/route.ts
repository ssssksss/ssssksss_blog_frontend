import {fetchMultipartCSR} from "@utils/api/fetchMultipartCSR";
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const result = await fetchMultipartCSR({
    req: request,
    url: `${process.env.BACKEND_URL}/api/blog2/basic`,
    formData: formData,
  });
  return result;
}

export async function PUT(request: NextRequest) {
  const formData = await request.formData();

  const result = await fetchMultipartCSR({
    req: request,
    url: `${process.env.BACKEND_URL}/api/blog2/basic`,
    formData: formData,
  });
  return result;
}
