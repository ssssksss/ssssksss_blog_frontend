import LottieAirplane from '@/../public/lottie/loading-airplane.json';
import LottieComponent from "@components/common/lottie/LottieComponent";
import Layout3 from "@components/layout/Layout3";
import UrlQueryStringToObject from "@utils/function/UrlQueryStringToObject";
import { ReactElement, useEffect } from "react";

const LoginSuccess = () => {

  useEffect(() => {
        const oauthLoginEvent = new CustomEvent("oauthLogin", {
          detail: {
            accessToken: UrlQueryStringToObject(window.location.href)?.accessToken,
          }
        });
        window.opener.document.dispatchEvent(oauthLoginEvent);
        window.close();
    },[])

  return (
    <div
      className={
        'flex flex-col h-[100vh] w-[100vw] items-center justify-center bg-white'
      }
    >
      <div className={'relative h-[245px] w-[275px]'}>
        {typeof window != undefined && (
          <LottieComponent
            lottieFile={LottieAirplane}
            className="h-full w-[275px]"
          />
        )}
      </div>
      <div> 로딩중... </div> 
    </div>
  );
};
export default LoginSuccess;
LoginSuccess.getLayout = function getLayout(page: ReactElement) {
    return <Layout3>{page}</Layout3>;
  };
