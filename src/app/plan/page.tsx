import PlanHomeDashBoard from "@component/plan/hybrid/PlanHomeDashBoard";
import { addDays, startOfMonth, subDays } from "date-fns";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "가출한토토로의 블로그",
  description: "일정",
};
interface IPage {}

async function getData() {
  const cookie = cookies().get("accessToken");
  const date = new Date();
  const firstDate = subDays(startOfMonth(date), startOfMonth(date).getDay());
  const endDate = addDays(firstDate, 41);
  const scheduleStartDate = firstDate.toISOString();
  const scheduleEndDate = endDate.toISOString();

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/plan/schedule?scheduleStartDate=${scheduleStartDate}&scheduleEndDate=${scheduleEndDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie?.value}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return {
        data: [],
      };
    }
    return response.json() as Promise<any>;
  } catch {
    throw new Error("일정을 받아오지 못했습니다.");
  }
}

const Page = async (props: IPage) => {
  const result: ResReadPlanScheduleList = await getData();
  return (
    <div
      className={
        "h-[calc(100%-3rem)] w-full p-0 sm:h-full sm:p-[0_0_0_3.75rem]"
      }
    >
      <PlanHomeDashBoard data={result.data} />
    </div>
  );
};
export default Page;
