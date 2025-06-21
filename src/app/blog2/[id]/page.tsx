import Blog2DetailContainer from "@component/blog2/hybrid/read/Blog2DetailContainer";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import ErrorPage from "@utils/error/ErrorPage";
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
  const response = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/blog2/${id}`,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
  return response.json();
}

export default async function page({ params: { id } }: { params: { id: string } }) {
  const result = await getData(Number(id));

  if (result?.error) {
    return <ErrorPage error={result.error} />;
  }

  return (
    <Template>
      {
        result.data &&
        <Blog2DetailContainer data={result?.data} />
      }
    </Template>
  );
}