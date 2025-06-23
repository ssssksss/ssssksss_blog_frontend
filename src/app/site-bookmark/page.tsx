import SiteBookmarkCategoryList from "@component/siteBookmark/hybrid/SiteBookmarkCategoryList";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import ErrorPage from "@utils/error/ErrorPage";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "에이지의 블로그",
  description: "자주 가는 사이트 목록",
};
interface IPage {}
async function getData() {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  const response = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/site-bookmark/category/list`,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
  return response.json();
}

const Page = async (props: IPage) => {
  const result = await getData();

  if (result?.error) {
    return <ErrorPage error={result.error} />;
  }

  return <SiteBookmarkCategoryList data={result?.data} />;
};
export default Page;
