import BoardMain from "@component/board/hybrid/BoardMain";
import PaginationSEOHead from "@component/common/seo/PaginationSEOHead";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import ErrorPage from "@utils/error/ErrorPage";

async function getData(searchParams: URLSearchParams) {
  const queryString = new URLSearchParams(searchParams).toString();
  const response = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/board/list?${queryString}`,
    isAuth: false,
    cache: "no-store",
  });

  const result = await response.json();

  if (result?.error) {
    return result;
  }

  return {
    data: result.data.content,
    totalElements: result.data.totalElements,
    page: result.data.number,
  };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  const pageNum = Number(params.get("page") || "1");

  return {
    title: pageNum === 1 ? "게시판" : `게시판 - ${pageNum}페이지`,
    description: "에이지의 게시판 글 목록입니다.",
  };
}

const Page = async ({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined};
}) => {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  const pageNum = Number(params.get("page") || "1");
  const result = await getData(params);

  if (result?.error) {
    return <ErrorPage error={result.error} />;
  }

  return (
    <>
      <PaginationSEOHead currentPage={pageNum} basePath="/board" />
      <div className="flex min-h-[calc(100%-3rem)] w-full items-center p-4">
        <BoardMain initialData={result} />
      </div>
    </>
  );
};

export default Page;
