import BoardCreateUpdateContainer from "@component/board/hybrid/BoardCreateUpdateContainer";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import ErrorPage from "@utils/error/ErrorPage";
import { cookies } from "next/headers";

async function getData(id: number) {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  const response = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/board/${id}?isEdit=true`,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });

  return response.json() as Promise<any>;
};


export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function page({ params: { id } }: { params: { id: string } }) {
  if (!Number.isSafeInteger(Number(id)) || Number(id) < 1) {
    throw Error("Not Found");
  }
  const pageId = Number(id);
  const result = await getData(pageId);

  if (result?.error) {
    return <ErrorPage error={result.error} />;
  }
  
  return (
    <div className={"flex h-full w-full p-4"}>
      <BoardCreateUpdateContainer isEdit={true} data={result?.data} />
    </div>
  );
}
