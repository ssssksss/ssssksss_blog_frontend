import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const refreshToken = cookies().get("refreshToken");
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/accessToken`,
    {
      method: "GET",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    },
  );
}
