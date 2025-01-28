import LoadingSpinner from "@component/common/spinner/LoadingSpinner";

interface ILoading {

}
const Loading = (props: ILoading) => {
  return (
    <LoadingSpinner loading={true} />
  );
};
export default Loading;