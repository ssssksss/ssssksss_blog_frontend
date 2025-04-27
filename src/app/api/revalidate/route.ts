import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { tags } = await req.json();

  if (!Array.isArray(tags) || tags.length === 0) {
    return NextResponse.json(
      {error: "At least one tag is required"},
      {status: 400},
    );
  }

  tags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({message: `Revalidated tags: ${tags.join(", ")}`});
}
