import Blog2ListContainer from "@component/blog2/container/read/Blog2ListContainer";
import Blog2Category from "@component/blog2/hybrid/read/Blog2Category";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import ErrorPage from "@utils/error/ErrorPage";
import { Metadata } from "next";
import Template from "./template";

export const metadata: Metadata = {
  title: "에이지의 블로그",
  description: "블로그",
};
interface IPage {}

// API 요청시 문제가 발생하면 error.tsx로 이동
async function getData() {
  const response = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/blog2/category/list`,
    next: {
      revalidate: 3600,
      tags: ["blog2CategoryList"],
    },
    isAuth: false,
  });
  return response.json();
}

const Page = async (props: IPage) => {
  const result = await getData();

  if (result?.error) {
    return <ErrorPage error={result.error} />;
  }

  return (
    <Template>
      {/* <Blog2SearchContainer /> */}
      <Blog2Category categoryList={result.data} />
      <Blog2ListContainer />
    </Template>
  );
};
export default Page;
