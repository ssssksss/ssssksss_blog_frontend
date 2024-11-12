import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
  const refresh_cookie = request.cookies.get("refreshToken");

  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/accessToken`,
    {
      method: "GET",
      headers: {
        Cookie: `${refresh_cookie?.name}=${refresh_cookie?.value}`,
      },
    },
  );
}
