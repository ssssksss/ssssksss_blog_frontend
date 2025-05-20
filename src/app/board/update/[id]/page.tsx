import BoardCreateUpdateContainer from "@component/board/hybrid/BoardCreateUpdateContainer";
import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { cookies } from "next/headers";

async function getData(id: number) {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  const response = await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/board/${id}?isEdit=true`,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });

  return response.json() as Promise<any>;
};


export async function generateMetadata({params: {id}}: {params: {id: string}}) {
  const pageId = Number(id);
  if (pageId <= 0 || !Number.isSafeInteger(pageId)) {
    throw Error("Not Found");
  }

  return {
    title: "게시판 수정 페이지",
    description: "게시판 수정 페이지",
  };
}

export default async function page({params: {id}}: {params: {id: string}}) {
  const pageId = Number(id);
  if (pageId < 1 || !Number.isSafeInteger(pageId)) {
    throw Error("Not Found");
  }

  const result: IResponseReadBoard = await getData(pageId);
  return (
    <div className={"flex h-full w-full p-4 text-[16px]"}>
      <BoardCreateUpdateContainer isEdit={true} data={result?.data} />
    </div>
  );
}
