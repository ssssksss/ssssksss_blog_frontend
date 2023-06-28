import styled from "@emotion/styled";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ReactToastifyComponents.tsx
 * @version 0.0.1 "2023-06-15 10:58:54"
 * @description 설명
 * import { store } from "@/redux/store";
 * import { SET_TOASTIFY_MESSAGE } from "@/redux/store/toastify";
 * const dispatch = useDispatch();
 * store.dispatch(SET_TOASTIFY_MESSAGE({
      type: "success",
      message: "추가 되었습니다.",
    }))

 */
const ReactToastifyComponents = () => {
  const toastifyStore = useSelector((state: RootState) => state.toastifyStore);

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
    notify();
  }, [toastifyStore]);

  return (
    <Container>
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={500} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        // closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        closeButton={true}
        // pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover={false} // 마우스를 올리면 알람 정지
        theme="light"
        limit={3} // 알람 개수 제한\
        theme="colored"
      />
    </Container>
  );
};
export default ReactToastifyComponents;

const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
`;
