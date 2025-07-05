

import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const refreshToken = cookies().get("refreshToken");
  return await fetch(
    `${process.env.BACKEND_URL}/api/user/accessToken`,
    {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken?.value}`,
      },
    },
  );
}
