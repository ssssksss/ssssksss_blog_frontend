import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({message: "Missing path"}, {status: 400});
  }

  try {
    // 홈 페이지면 path는 "/" 로 지정
    revalidatePath(path);
    return NextResponse.json({revalidated: true, path});
  } catch (error) {
    return NextResponse.json(
      {message: "Revalidation error", error},
      {status: 500},
    );
  }
}

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
