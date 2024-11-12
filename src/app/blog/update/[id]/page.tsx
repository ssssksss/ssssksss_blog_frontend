import Blog2CreateUpdateContainer from "@component/blog2/container/create/Blog2CreateUpdateContainer";
import { cookies } from "next/headers";
import Template from "../../template";

export async function generateMetadata({ params: { id } }: {params: { id: string }}) {
  const pageId = Number(id);
  if (pageId <= 0 || !Number.isSafeInteger(pageId)) {
    throw Error("Not Found");
  }

  return {
    title: `블로그2 수정 - ${pageId}`,
    description: "블로그2의 수정 페이지",
  };
}

async function getData(id: number) {
  const accessToken = cookies().get("accessToken");
  // TODO: 쿠키가 만료된 경우 처리가 필요하다.
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/blog2/${id}?isEdit=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
      cache: "no-store",
    //   next: { revalidate: 3600, tags: [`blog2 - ${id}`] },
    },
  );

  if (!response.ok) {
    throw new Error();
  }

  return response.json() as Promise<any>;
}

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const pageId = Number(id);
  if (pageId < 1 || !Number.isSafeInteger(pageId)) {
    throw Error("Not Found");
  }

  const result: { statusCode: number, msg: string, data: ResBlog2Update } = await getData(pageId);
  return (
    <Template>
      <Blog2CreateUpdateContainer data={result.data} isEdit={true} />
    </Template>
  );
};
export default Page;