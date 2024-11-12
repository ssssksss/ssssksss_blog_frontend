import BlogListContainer from "@component/blog/container/read/BlogListContainer";
import BlogCategory from "@component/blog/hybrid/read/BlogCategory";
import {Metadata} from "next";
import Template from "./template";

export const metadata: Metadata = {
  title: "가출한토토로의 블로그",
  description: "블로그",
};
interface IPage {}

async function getData() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/blog/category/list`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Page = async (props: IPage) => {
  const initData = await getData();

  return (
    <Template>
      {/* <Blog2SearchContainer /> */}
      <BlogCategory categoryList={initData.data.blogFirstCategoryList} />
      <BlogListContainer />
    </Template>
  );
};
export default Page;
