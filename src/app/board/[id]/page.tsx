import BoardDetailContainer from "@component/board/hybrid/BoardDetailContainer";
import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";

async function getData(id: number) {
  const response = await fetchApiRoutes({
    url: `${process.env.BACKEND_URL}/api/board/${id}`,
    method: "GET",
    next: {revalidate: 3600, tags: [`getBoard/${id}`]},
    isAuth: false,
  });

  return response.json() as Promise<any>;
}

export async function generateMetadata({params: {id}}: {params: {id: string}}) {
  const pageId = Number(id);
  if (pageId <= 0 || !Number.isSafeInteger(pageId)) {
    throw Error("Not Found");
  }

  return {
    title: "게시판 페이지",
    description: "게시판 페이지",
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
      <BoardDetailContainer data={result?.data} />
    </div>
  );
}
