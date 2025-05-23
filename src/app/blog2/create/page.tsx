import Blog2CreateUpdateContainer from "@component/blog2/container/create/Blog2CreateUpdateContainer";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import { Metadata } from "next";
import Template from "../template";

export const metadata: Metadata = {
  title: "에이지의 블로그 작성",
  description: "블로그 작성",
};
// API 요청시 문제가 발생하면 error.tsx로 이동
async function getData() {
  const res = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/blog2/category/list`,
    next: {
      revalidate: 3600,
      tags: ["blog2CategoryList"],
    },
    isAuth: false,
  });

  return res.json();
}

const Page = async () => {

  const initData: {statusCode: number, msg: string, data: any} = await getData();

  return (
    <Template>
      <Blog2CreateUpdateContainer categoryList={initData.data.categoryList} />
    </Template>
  );
};
export default Page;