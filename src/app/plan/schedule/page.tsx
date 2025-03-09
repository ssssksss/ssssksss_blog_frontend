import PlanScheduleMainBox from "@component/plan/hybrid/PlanScheduleMainBox";

export async function generateMetadata() {
  return {
    title: "에이지의 일정 서비스",
    description: "에이지의 여행 일정 사이트",
  };
}

interface IPage {}

const Page = (props: IPage) => {
  return (
    <PlanScheduleMainBox />
  );
};
export default Page;
