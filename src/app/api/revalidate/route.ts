import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const {tags} = await req.json();

  if (!Array.isArray(tags) || tags.length === 0) {
    return NextResponse.json(
      {error: "At least one tag is required"},
      {status: 400},
    );
  }

  tags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({message: `Revalidated tags: ${tags.join(", ")}`});
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const path = req.nextUrl.searchParams.get("path");

  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET || !path) {
    return new Response("Unauthorized", {status: 401});
  }

  try {
    // 페이지 프리렌더링 재요청
    await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}${path}`, {
      headers: {
        "x-prerender-revalidate": process.env.NEXT_PUBLIC_REVALIDATE_SECRET!,
      },
    });

    return new Response("Revalidated", {status: 200});
  } catch (err) {
    return new Response("Error revalidating", {status: 500});
  }
}