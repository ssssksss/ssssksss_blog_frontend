import TeamSpaceInviteMain from "@component/team-space/hybrid/TeamSpaceInviteMain";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import ErrorPage from "@utils/error/ErrorPage";
import { cookies } from "next/headers";

interface IPage {

}
async function getData() {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  const response = await fetchServerSideInServerComponent({
    url: `${process.env.BACKEND_URL}/api/team-space/invite`,
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
    <TeamSpaceInviteMain invitationList={result.data} />
  );
};
export default Page;
