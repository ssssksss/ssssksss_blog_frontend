// serverActions.ts
"use server";
import { cookies } from "next/headers";

export async function setCookie(newAccessToken: string) {
  cookies().set("accessToken", newAccessToken, {
    path: "/",
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: true,
  });
}
