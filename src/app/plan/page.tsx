import PlanHomeDashBoard from "@component/plan/hybrid/PlanHomeDashBoard";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import { addDays, startOfMonth, subDays } from "date-fns";
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
  const date = new Date();
  const firstDate = subDays(startOfMonth(date), startOfMonth(date).getDay());
  const endDate = addDays(firstDate, 41);
  const scheduleStartDate = firstDate.toISOString();
  const scheduleEndDate = endDate.toISOString();

  const response = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/plan/schedule?scheduleStartDate=${scheduleStartDate}&scheduleEndDate=${scheduleEndDate}`,
    method: "GET",
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
  return response.json();

}

const Page = async (props: IPage) => {
  const result: ResReadPlanScheduleList = await getData();
  return (
    <PlanHomeDashBoard data={result.data} />
  );
};
export default Page;
