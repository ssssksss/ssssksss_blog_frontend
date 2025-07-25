import Blog2CreateUpdateContainer from "@component/blog2/container/create/Blog2CreateUpdateContainer";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import ErrorPage from "@utils/error/ErrorPage";
import { cookies } from "next/headers";
import Template from "../../template";

export async function generateMetadata({ params: { id } }: {params: { id: string }}) {
  const pageId = Number(id);
  if (pageId <= 0 || !Number.isSafeInteger(pageId)) {
    throw Error("Not Found");
  }

  return {
    title: `블로그2 수정 - ${pageId}`,
    description: "블로그2의 수정 페이지",
  };
}

async function getData(id: number) {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  const response = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/blog2/${id}/admin?isEdit=true`,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
  return response.json();
}


const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const pageId = Number(id);
  if (pageId < 1 || !Number.isSafeInteger(pageId)) {
    throw Error("Not Found");
  }
  const result = await getData(pageId);

  if (result?.error) {
    return <ErrorPage error={result.error} />;
  }

  return (
    <Template>
      <Blog2CreateUpdateContainer data={result.data} isEdit={true} />
    </Template>
  );
};
export default Page;