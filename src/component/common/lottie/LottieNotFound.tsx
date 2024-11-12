"use client";

import LottieFile from "@/../public/lottie/list-not-found.json";
import LottieComponent from "./LottieComponent";

const LottieNotFound = ({ text }: { text: string }) => {
  return (
    <div className="relative flex aspect-square w-[20rem] items-center justify-center">
      <LottieComponent lottieFile={LottieFile} className="mr-5 w-[8rem]" />
      <p className="absolute bottom-1/2 left-1/2 flex w-full -translate-x-1/2 translate-y-[6.375rem] justify-center">
        {text}
      </p>
    </div>
  );
};

export default LottieNotFound;
