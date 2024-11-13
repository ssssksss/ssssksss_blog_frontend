import PlanTravelBanner from "@component/travel/hybrid/PlanTravelBanner";
import PlanTravelBody from "@component/travel/hybrid/PlanTravelBody";

interface IPage {}

export async function generateMetadata() {
  return {
    title: "에이지의 여행 정보",
    description: "에이지의 여행 일정 사이트",
  };
}

const Page = (props: IPage) => {
  return (
    <div className={"h-full w-full py-[1rem] sm:p-[0_0_1rem_3.75rem]"}>
      <PlanTravelBanner />
      <PlanTravelBody />
    </div>
  );
};
export default Page;
