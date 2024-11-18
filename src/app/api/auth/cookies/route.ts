import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = cookies().get("accessToken")?.value || "";
  const refreshToken = cookies().get("refreshToken")?.value || "";

  return NextResponse.json({accessToken, refreshToken});
}
