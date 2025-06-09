"use client";

import LottieError from "@component/common/lottie/LottieError";
import useToastifyStore from "@store/toastifyStore";
import clog from "@utils/logger/logger";
import { Metadata } from "next";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "에러",
  description: "에러 페이지",
};

interface Props {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  const toastifyStore = useToastifyStore();
  useEffect(() => {
    try {
      JSON.parse(error.message);
      toastifyStore.setToastify({
        type: "error",
        message: error.message,
      });
    } catch (e) {
      toastifyStore.setToastify({
        type: "error",
        message: "예상 외 서버 에러",
      });
    }
  }, [error]);

  try {
    JSON.parse(error.message);

    return (
      <div className="relative flex h-full w-full flex-col bg-default-1">
        <LottieError
          text={error.message || "에러가 발생했습니다."}
          reset={reset}
        ></LottieError>
      </div>
    );
  } catch (e) {
    clog.error(error.message);
    return (
      <div className="relative flex h-full w-full flex-col bg-default-1">
        <LottieError
          text={"{\"code\": 500, \"message\": \"서버 에러\"}"}
          reset={reset}
        ></LottieError>
      </div>
    );
  }
};

export default Error;
