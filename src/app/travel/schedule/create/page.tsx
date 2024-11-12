import TravelCreateUpdateContainer from "@component/schedule/hybrid/TravelCreateUpdateContainer";

export async function generateMetadata() {
  return {
    title: "에이지의 여행 일정 만들기",
    description: "여행 일정 만드는 페이지",
  };
}

export default async function page() {
  return (
    <div
      className={
        "h-[calc(100%-3rem)] w-full p-0 sm:h-full sm:p-[0_0_0_3.75rem]"
      }
    >
      <TravelCreateUpdateContainer />
    </div>
  );
}
