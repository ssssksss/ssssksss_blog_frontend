import {fetchCSR} from "@utils/api/fetchCSR";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const page = url.searchParams.get("page");
  return await fetchCSR({
    url: `${process.env.BACKEND_URL}/api/blog2/basic/structure?search=${search}&page=${page}`,
    req: request,
  });
}
