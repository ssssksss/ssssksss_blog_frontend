import BoardCreateUpdateContainer from "@component/board/hybrid/BoardCreateUpdateContainer";

export async function generateMetadata() {
  return {
    title: "에이지의 게시판 생성",
    description: "게시판 생성",
  };
}

interface IPage {}

const Page = async (props: IPage) => {
  //   const result: ResReadPlanScheduleList = await getData();
  return (
    <div className={"flex h-full w-full p-4 text-[16px]"}>
      <BoardCreateUpdateContainer />
    </div>
  );
};
export default Page;
