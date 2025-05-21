import SentryIssueList from "@component/sentry/SentryIssueList";

interface IPage {

}
const Page = async (props: IPage) => {
  return (
    <div>
      <SentryIssueList />
    </div>
  );
};
export default Page;