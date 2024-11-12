import BoardDetailContainer from "@component/board/hybrid/BoardDetailContainer";

async function getData(id: number) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/board?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {revalidate: 3600, tags: [`getBoard/${id}`]},
    },
  );

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
      <BoardDetailContainer result={result} />
    </div>
  );
}
