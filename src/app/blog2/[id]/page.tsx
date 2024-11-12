import Blog2DetailBox from "@component/blog2/hybrid/read/Blog2DetailBox";
import { cookies } from "next/headers";
import Template from "../template";

async function getData(id: number) {
  const accessToken = cookies().get("accessToken");
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/blog2/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
      // cache: "no-store",
      next: { revalidate: 10 },
    //   next: { revalidate: 3600, tags: [`blog2 - ${id}`] },
    },
  );

  if (!response.ok) {
    throw new Error("");
  }

  return response.json() as Promise<any>;
}

export async function generateMetadata({ params: { id } }: {params: { id: string }}) {
  const pageId = Number(id);
  if (pageId <= 0 || !Number.isSafeInteger(pageId)) {
    throw Error("Not Found");
  }

  return {
    title: `블로그2 상세페이지 - ${pageId}`,
    description: "블로그2의 상세 페이지",
  };
}

export default async function page({ params: { id } }: { params: { id: string } }) {
  const pageId = Number(id);
  if (pageId < 1 || !Number.isSafeInteger(pageId)) {
    throw Error("Not Found");
  }

  const result: {
        data: responseReadBlog2,
            msg: string;    
            statusCode: number;
  } = await getData(pageId);
  
  return (
    <Template>
      <Blog2DetailBox data={result.data} />
    </Template>
  );
}