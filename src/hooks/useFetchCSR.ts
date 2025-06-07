import * as Sentry from "@sentry/nextjs";
import useLoadingStore from "@store/loadingStore";
import useToastifyStore from "@store/toastifyStore";
import { handleToastError } from "@utils/error/handleToastError";
import clog from "@utils/logger/logger";
import { useEffect } from "react";

// fetch를 보내 toast 메시지를 보여주고, 성공시 data를 반환
interface IFetchFn {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" ;
  formData?: FormData;
  body?: Record<string, any>;
  contentType?: undefined | "application/x-www-form-urlencoded";
  cache?: RequestCache;
  handleRevalidateTags?: string[];
  showSuccessToast?: boolean;
  successMessage?: string;
  showLoading?: boolean;
}
// fetch를 요청하고 액세스 재발급까지는 안되는 로직, 인증 처리도 없음
// 단 fetch를 route.ts로 보내면 인증처리가 가능할 수도 있음
function useFetchCSR() {
  const toastifyStore = useToastifyStore();
  const loadingState = useLoadingStore();

  // toast 메시지를 띄우기 위해서
  useEffect(() => {}, [toastifyStore.message]);

  /**
   * response 응답이 아닌 결과 데이터를 반환합니다.
   * @returns result.data(성공) || "success"(성공 반환데이터가 없는 경우) || undefined(실패)
   */
  const requestWithHandler = async ({
    url,
    method,
    formData,
    contentType,
    body,
    cache,
    handleRevalidateTags,
    showSuccessToast = false,
    successMessage,
    showLoading = true,
  }: IFetchFn) => {
    if (showLoading) {
      loadingState.startLoading();
    }

    try {
      // api route의 router handling을 사용해서 처리
      const response = await fetch(url, {
        method: method || "GET",
        ...(formData
          ? {}
          : {"Content-Type": contentType || "application/json"}),
        body: formData ? formData : body ? JSON.stringify(body) : undefined,
        ...(cache ? {cache} : {}),
      });
      console.log("useFetchCSR.ts 파일 : ",response);
      if (!response.ok) {
        clog.info(
          "fetchCSR 에러: " + response.status + " : " + response.statusText,
        );
        toastifyStore.setToastify(await handleToastError(response));
        await revalidateTags(handleRevalidateTags);
        throw new Error(response?.statusText);
      }
      let result = null;
      if (response.status !== 204) {
        result = await response.json();
      }
      if (showSuccessToast) {
        await toastifyStore.setToastify({
          type: "success",
          message: successMessage || result?.msg || "성공",
        });
      }
      await revalidateTags(handleRevalidateTags);
      return result?.data || "success";
    } catch (error) {
      if (error instanceof Error) {
        clog.error(error.message);
        Sentry.captureException(error); // Sentry로 에러 전송
      } else {
        clog.error(error);
        Sentry.captureException(new Error(String(error))); // 에러가 객체가 아닌 경우
      }
      return;
    } finally {
      if(showLoading) loadingState.stopLoading();
    }
  };

  return {toastifyStore, loadingState, requestWithHandler};
}

const revalidateTags = async (tags?: string[]) => {
  if (tags?.length) {
    await Promise.all(
      tags.map(async (tag) => {
        await fetch("/api/revalidate", {
          method: "POST",
          body: JSON.stringify({tags: tags}),
          headers: {"Content-Type": "application/json"},
        });
      }),
    );
  }
};

export default useFetchCSR;
