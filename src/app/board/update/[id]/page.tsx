import BoardCreateUpdateContainer from "@component/board/hybrid/BoardCreateUpdateContainer";
import {cookies} from "next/headers";

async function getData(id: number) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/board?id=${id}&isEdit=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      cache: "no-store",
    },
  );

  if (response.status == 403) {
    throw new Error("접근 권한 없음");
  }
  if (!response.ok) {
    throw new Error("에러");
  }

  return response.json() as Promise<any>;
}

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
      <BoardCreateUpdateContainer isEdit={true} result={result} />
    </div>
  );
}
