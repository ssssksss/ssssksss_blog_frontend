"use client";

import LottieError from "@component/common/lottie/LottieError";
import useToastifyStore from "@store/toastifyStore";
import {Metadata} from "next";
import {useEffect} from "react";

export const metadata: Metadata = {
  title: "에러",
  description: "에러 페이지",
};

interface Props {
  error: Error;
  reset: () => void;
}

const Error = ({error, reset}: Props) => {
  const toastifyStore = useToastifyStore();
  useEffect(() => {
    toastifyStore.setToastify({
      type: "error",
      message: error.message,
    });
  }, [error]);

  return (
    <div className="relative flex h-full w-full flex-col">
      <LottieError
        text={error.message || "에러가 발생했습니다."}
        reset={reset}></LottieError>
    </div>
  );
};

export default Error;
