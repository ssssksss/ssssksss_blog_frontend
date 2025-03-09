"use client";

import LottieFile from "@/../public/lottie/error.json";
import LottieComponent from "./LottieComponent";

interface ILottieError {
  text?: string;
  reset: () => void;
}

const LottieError = (props: ILottieError) => {
  return (
    <div className="relative flex aspect-square w-full flex-col items-center justify-center gap-y-2">
      <LottieComponent
        lottieFile={LottieFile}
        className="w-full max-w-[16rem]"
      />
      <p className="absolute bottom-1/2 left-1/2 flex w-full gap-x-1 -translate-x-1/2 translate-y-[6.375rem] justify-center">
        <span> {JSON.parse(props.text as string).code} </span>
        <span> {JSON.parse(props.text as string).message} </span>
      </p>
      <button
        className="p-2 primary-border-radius"
        onClick={() => {
          window.location.reload();
        }}
      >
        다시 시도하기
      </button>
    </div>
  );
};

export default LottieError;
