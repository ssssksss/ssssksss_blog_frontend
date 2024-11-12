import LottieFile from "@/../public/lottie/loading-hand.json";
import LottieComponent from "../lottie/LottieComponent";

interface Props {
  loading: boolean;
}

const LoadingSpinner = ({ loading }: Props) => {
  if (!loading) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-80/50">
      <LottieComponent lottieFile={LottieFile} className="mr-5 w-[8rem]" />
    </div>
  );
};

export default LoadingSpinner;
