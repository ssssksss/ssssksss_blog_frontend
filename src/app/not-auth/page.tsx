import LottieAuthLock from "@component/common/lottie/LottieAuthLock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "인증 에러 페이지",
  description: "인증 에러 페이지",
};

const Page = () => {
  return (
    <div className="relative flex h-full w-full flex-col bg-default-1">
      <div className="relative flex aspect-square w-full flex-col items-center justify-center gap-y-2">
        <LottieAuthLock text={"로그인이 필요합니다."} />
      </div>
    </div>
  );
};

export default Page;
