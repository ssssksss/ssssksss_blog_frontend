import PlanMemoContainer from "@component/plan/hybrid/PlanMemoContainer";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import ErrorPage from "@utils/error/ErrorPage";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "메모장",
  description: "일정",
};
interface IPage {}

async function getData() {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");

  const response = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/plan/memo/list`,
    method: "GET",
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

  return (
    <PlanMemoContainer data={result.data} />
  );
};
export default Page;
