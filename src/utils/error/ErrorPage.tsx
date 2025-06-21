"use client";

import LottieComponent from "@component/common/lottie/LottieComponent";
import Lottie403 from "@lottie/403.json";
import Lottie404 from "@lottie/404.json";
import Lottie401 from "@lottie/computer_lock.json";
import Lottie500 from "@lottie/error.json";
import { useRouter } from "next/navigation";

interface IErrorPage {
  error: {
    message: string;
    code: 401 | 403 | 404 | 500; // 명시적인 에러 코드만 허용
  };
}

interface ErrorLottieMap {
  [key: number]: {
    lottieFile: unknown; // 실제 Lottie 파일 타입
  };
}

// 에러 코드와 Lottie 파일 매핑
const errorLottieMap: ErrorLottieMap = {
  401: {
    lottieFile: Lottie401,
  },
  403: {
    lottieFile: Lottie403,
  },
  404: {
    lottieFile: Lottie404,
  },
  500: {
    lottieFile: Lottie500,
  },
};

const ErrorPage = ({error}: IErrorPage) => {
  const errorData = errorLottieMap[error.code];
  const router = useRouter();

  return (
    <div className="relative h-[calc(100vh-4.25rem)] w-full flex-col default-flex">
      <LottieComponent
        lottieFile={errorData?.lottieFile}
        className="w-full max-w-[16rem]"
      />
      <p className="absolute bottom-1/2 left-1/2 flex w-full -translate-x-1/2 translate-y-[6.375rem] justify-center gap-x-1">
        <span>{error.message}</span>
      </p>
      {(error.code == 401 || error.code == 500) ? (
        <button
          className="p-2 primary-border-radius"
          onClick={() => {
            router.refresh();
          }}
        >
          다시 시도하기
        </button>
      ) : (
        <button
          className="p-2 primary-border-radius"
          onClick={() => {
            router.back();
          }}
        >
          뒤로가기
        </button>
      )}
    </div>
  );
};

export default ErrorPage;
