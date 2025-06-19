import LottieFile from "@lottie/loading-comment.json";
import LottieComponent from "../lottie/LottieComponent";

interface Props {
  loading: boolean;
}

const LoadingCommentSpinner = ({loading}: Props) => {
  if (!loading) {
    return null;
  }

  return (
    <LottieComponent lottieFile={LottieFile} className="w-full" />
  );
};

export default LoadingCommentSpinner;
