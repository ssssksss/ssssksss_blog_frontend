import BoardMain from "@component/board/hybrid/BoardMain";
import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { cookies } from "next/headers";

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
  const response = await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/board/list?${queryString}`,
    accessToken: accessToken,
    refreshToken: refreshToken,
    isAuth: false,
    cache: "no-store"
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
    <div className="flex min-h-[calc(100%-3rem)] w-full items-center p-4 ">
      <BoardMain initialData={initialData} />
    </div>
  );
};

export default Page;
