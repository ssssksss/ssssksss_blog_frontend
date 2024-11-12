import Blog2CreateUpdateContainer from "@component/blog2/container/create/Blog2CreateUpdateContainer";
import {Metadata} from "next";
import Template from "../template";

export const metadata: Metadata = {
  title: "가출한토토로의 블로그 작성",
  description: "블로그 작성",
};

async function getData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/blog2/category/list`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Page = async () => {
  const initData: {statusCode: number; msg: string; data: any} =
    await getData();

  return (
    <Template>
      <Blog2CreateUpdateContainer categoryList={initData.data.categoryList} />
    </Template>
  );
};
export default Page;
