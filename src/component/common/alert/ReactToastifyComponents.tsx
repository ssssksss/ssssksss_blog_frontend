import { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToastifyStore from "src/store/toastifyStore";

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ReactToastifyComponents.tsx
 * @version 0.0.1 "2023-06-15 10:58:54"
 * @description 설명
 */
const ReactToastifyComponents = () => {
  const toastifyStore = useToastifyStore();
  const isMounted = useRef(false);
  const notify = () => {
    switch (toastifyStore.type || "default") {
      case "success":
        toast.success(toastifyStore.message);
        break;
      case "error":
        toast.error(toastifyStore.message);
        break;
      case "warning":
        toast.warning(toastifyStore.message);
        break;
      case "info":
        toast.info(toastifyStore.message);
        break;
      case "default":
        toast(toastifyStore.message);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!toastifyStore.message) return;
    if (isMounted.current) notify();
    else isMounted.current = true;
  }, [toastifyStore]);

  return (
    <ToastContainer
      position={"top-right"} // 알람 위치 지정
      autoClose={1000} // 자동 off 시간
      hideProgressBar={true} // 진행시간바 숨김
      // closeOnClick // 클릭으로 알람 닫기
      rtl={false} // 알림 좌우 반전
      // closeButton={true}
      // pauseOnFocusLoss // 화면을 벗어나면 알람 정지
      draggable // 드래그 가능
      pauseOnHover={false} // 마우스를 올리면 알람 정지
      limit={3} // 알람 개수 제한\
      closeButton={false}
      // theme={"colored"}
      // className={"translate-y-[4rem]"}
      bodyClassName={() =>
        "px-4 py-4 text-white-60 ml-auto w-fit text-lg outline outline-black-60 flex items-center rounded-[2rem] fillAnimation animate-fill shadow-2xl"
      }
      toastClassName={() => ""}
    />
  );
};
export default ReactToastifyComponents;
