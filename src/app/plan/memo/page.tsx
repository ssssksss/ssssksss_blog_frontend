import PlanMemoContainer from "@component/plan/hybrid/PlanMemoContainer";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "에이지의 블로그",
  description: "일정",
};
interface IPage {}

async function getData() {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");

  const response = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/plan/memo`,
    method: "GET",
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
  return response.json();
}

const Page = async (props: IPage) => {
  const result = await getData();
  return (
    <PlanMemoContainer data={result.data} />
  );
};
export default Page;
