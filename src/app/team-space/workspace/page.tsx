import TeamSpaceMain from "@component/team-space/hybrid/TeamSpaceMain";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import ErrorPage from "@utils/error/ErrorPage";
import { cookies } from "next/headers";

interface IPage {

}

// 초기 요청으로 프로젝트 리스트를 받아오는 작업이 필요

async function getData() {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  const response = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/team-space/project`,
    accessToken: accessToken,
    refreshToken: refreshToken,
    // next: {
    //   revalidate: 3600,
    //   tags: ["teamSpaceProjectList"],
    // },
    cache: "no-store"
  });
  return response.json();
}

const Page = async (props: IPage) => {
  const result = await getData();

  if (result?.error) {
    return <ErrorPage error={result.error} />;
  }

  return (
    <TeamSpaceMain projectList={result.data} />
  );
};
export default Page;