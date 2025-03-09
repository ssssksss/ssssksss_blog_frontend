import BoardMain from "@component/board/hybrid/BoardMain";
import { fetchSSRWithAuthAndErrorProcess } from "@utils/api/fetchSSRWithAuthAndErrorProcess";
import { cookies } from "next/headers";
import { Suspense } from "react";

interface IBoard {
  id: number;
  title: string;
  createdAt: string;
  views: number;
}

async function getData(searchParams: URLSearchParams) {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  const queryString = new URLSearchParams(searchParams).toString();

  const response = await fetchSSRWithAuthAndErrorProcess({
    url: `${process.env.BACKEND_URL}/api/board/list?${queryString}`,
    method: "GET",
    accessToken: accessToken?.value || "",
    refreshToken: refreshToken?.value || "",
    next: {revalidate: 60},
  });

  const result = await response.json();
  return {
    data: result.data.content,
    totalElements: result.data.totalElements,
    page: result.data.number,
  };
}

export async function generateMetadata() {
  return {
    title: "에이지의 게시판",
    description: "게시판",
  };
}

const Page = async ({searchParams}: {searchParams: URLSearchParams}) => {
  const initialData = await getData(searchParams);

  return (
    <div className="flex h-[calc(100%-3rem)] w-full items-center p-4 text-[16px] sm:h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <BoardMain initialData={initialData} />
      </Suspense>
    </div>
  );
};

export default Page;
