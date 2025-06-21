import BoardDetailContainer from "@component/board/hybrid/BoardDetailContainer";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import ErrorPage from "@utils/error/ErrorPage";


export async function generateMetadata({params: {id}}: {params: {id: string}}) {
  const pageId = Number(id);
  if (pageId <= 0 || !Number.isSafeInteger(pageId)) {
    throw Error("Not Found");
  }

  return {
    title: "게시판 조회",
    description: "게시판 페이지",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/board/${id}`,
    },
  };
}

async function getData(id: number) {
  const response = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/board/${id}`,
    method: "GET",
    next: {revalidate: 86400, tags: [`getBoard/${id}`]},
    isAuth: false,
  });

  return response.json() as Promise<any>;
}


export default async function page({params: {id}}: {params: {id: string}}) {
  const pageId = Number(id);
  const result = await getData(pageId);

  if (result?.error) {
    return <ErrorPage error={result.error} />;
  }

  return (
    <div className={"flex h-full w-full p-4 text-[16px]"}>
      <BoardDetailContainer data={result?.data} />
    </div>
  );
}
