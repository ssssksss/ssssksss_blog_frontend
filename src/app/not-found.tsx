import LottieNotFoundPage from "@component/common/lottie/LottieNotFoundPage";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Not found 페이지",
};

export default function NotFound() {
  return (
    <div className="h-full w-full default-flex">
      <LottieNotFoundPage
        text={"찾을 수 없는 페이지 입니다."}
      ></LottieNotFoundPage>
    </div>
  );
}
