import Blog2DetailBox from "@component/blog2/hybrid/read/Blog2DetailBox";
import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { cookies } from "next/headers";
import Template from "../template";

export async function generateMetadata({ params: { id } }: {params: { id: string }}) {
  const pageId = Number(id);
  if (pageId <= 0 || !Number.isSafeInteger(pageId)) {
    throw new Error(
      JSON.stringify({
        code: 400,
        message: "잘못된 경로",
      }),
    );
  }

  return {
    title: `블로그2 상세페이지 - ${pageId}`,
    description: "블로그2의 상세 페이지",
  };
}

async function getData(id: number) {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  const response = await fetchApiRoutes(
    {
      url: `${process.env.BACKEND_URL}/api/blog2/${id}`,
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  );
  return response.json();
}

export default async function page({ params: { id } }: { params: { id: string } }) {
  const result: {
    data: responseReadBlog2,
    msg: string;    
    statusCode: number;
  } = await getData(Number(id));

  return (
    <Template>
      {
        result.data &&
        <Blog2DetailBox data={result?.data} />
      }
    </Template>
  );
}