import Blog2ListContainer from "@component/blog2/container/read/Blog2ListContainer";
import Blog2Category from "@component/blog2/hybrid/read/Blog2Category";
import { fetchSSRWithAuthAndErrorProcess } from "@utils/api/fetchSSRWithAuthAndErrorProcess";
import { Metadata } from "next";
import Template from "./template";

export const metadata: Metadata = {
  title: "가출한토토로의 블로그",
  description: "블로그",
};
interface IPage {}

async function getData() {
  const response = await fetchSSRWithAuthAndErrorProcess({
    url: `${process.env.BACKEND_URL}/api/blog2/category/list`,
    method: "GET",
    next: {
      revalidate: 10,
    },
  });

  return response.json();
}

const Page = async (props: IPage) => {
  const initData = await getData();

  return (
    <Template>
      {/* <Blog2SearchContainer /> */}
      <Blog2Category categoryList={initData.data.categoryList} />
      <Blog2ListContainer />
    </Template>
  );
};
export default Page;
