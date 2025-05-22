import SentryIssueList from "@component/sentry/SentryIssueList";

interface IPage {

}
const Page = async (props: IPage) => {
  return (
    <SentryIssueList />
  );
};
export default Page;