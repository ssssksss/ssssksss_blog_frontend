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
    <div style={{zIndex: 999}} className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-primary-20 opacity-60">
      <LottieComponent lottieFile={LottieFile} className="mr-5 w-[8rem]" />
    </div>
  );
};

export default LoadingSpinner;
