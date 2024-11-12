// async function getData(id: number) {
//   const cookie = cookies().get("access_token");
//   const response = await fetch(`${process.env.BACKEND_URL}/api/`, {
//     method: "GET",
//     headers: {
//       Cookie: `${cookie?.name}=${cookie?.value}`,
//     },
//     next: {revalidate: 60, tags: [`getTag/id`]},
//   });

import BoardMain from "@component/board/hybrid/BoardMain";
import {Suspense} from "react";

//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }

//   return response.json() as Promise<any>;
// }

interface IPage {}

export async function generateMetadata() {
  return {
    title: "에이지의 게시판",
    description: "게시판",
  };
}

const Page = async (props: IPage) => {
  //   const result: ResReadPlanScheduleList = await getData();
  return (
    <div
      className={
        "flex h-[calc(100%-3rem)] w-full items-center p-4 text-[16px] sm:h-full"
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <BoardMain />
      </Suspense>
    </div>
  );
};
export default Page;
