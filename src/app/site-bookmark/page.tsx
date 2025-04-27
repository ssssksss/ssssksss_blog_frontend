import SiteBookmarkCategoryList from "@component/siteBookmark/hybrid/SiteBookmarkCategoryList";
import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "가출한토토로의 블로그",
  description: "자주 가는 사이트 목록",
};
interface IPage {}

async function getData() {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  const response = await fetchApiRoutes(
    {
      url: `${process.env.BACKEND_URL}/api/site-bookmark/category/list`,
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  );
  return response.json();
}


const Page = async (props: IPage) => {
  const result = await getData();
  return (
    <SiteBookmarkCategoryList data={result?.data} />
  ); 
};
export default Page;
