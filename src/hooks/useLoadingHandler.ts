import useLoadingStore from "@store/loadingStore";
import useToastifyStore from "@store/toastifyStore";
import { flushSync } from "react-dom";

const useLoadingHandler = () => {

  const loadingStore = useLoadingStore();
  const toastifyStore = useToastifyStore();

  const loadingWithHandler = async (handler: any) => {
    await flushSync(() => {
      loadingStore.startLoading(); // 상태값 변경
    });
    await flushSync(async () => {
      try {
        const result: { type: string, message: string } = await handler(); // handler 실행
        if (result?.message) {
          toastifyStore.setToastify(result);
        }
      } catch (error) {
        console.error("Error occurred:", error); // 에러 처리 (필요시)
      } finally {
        loadingStore.stopLoading(); // 항상 실행
      }
    });
  };

  return { loadingWithHandler };

};
export default useLoadingHandler;