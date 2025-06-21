import Blog2CreateUpdateContainer from "@component/blog2/container/create/Blog2CreateUpdateContainer";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import ErrorPage from "@utils/error/ErrorPage";
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
      revalidate: 86400,
      tags: ["blog2CategoryList"],
    },
    isAuth: false,
  });

  return res.json();
}

const Page = async () => {

  const result = await getData();

  if (result?.error) {
    return <ErrorPage error={result.error} />;
  }

  return (
    <Template>
      <Blog2CreateUpdateContainer categoryList={result.data} />
    </Template>
  );
};
export default Page;