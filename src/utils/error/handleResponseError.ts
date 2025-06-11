import * as Sentry from "@sentry/nextjs";

export const handleResponseError = async (response: Response) => {
  if (!response.status) {
    throw new Error(
      JSON.stringify({
        code: 500,
        message: "네트워크오류 혹은 CORS 문제",
      }),
    );
  }
  if (response.status == 400) {
    throw new Error(
      JSON.stringify({
        code: 400,
        message: "잘못된 요청",
      }),
    );
  }
  if (response.status == 401) {
    throw new Error(
      JSON.stringify({
        code: 401,
        message: "인증이 필요합니다.",
      }),
    );
  }
  if (response.status == 404) {
    throw new Error(
      JSON.stringify({
        code: 404,
        message: "잘못된 요청",
      }),
    );
  }
  if (response.status == 403) {
    throw new Error(
      JSON.stringify({
        code: 403,
        message: "잘못된 요청",
      }),
    );
  }

  if (!response?.ok) {
    const result = await response.json();
    if (result) {
      Sentry.captureException(new Error(String(response.url + result.status + result?.msg)));
    }
    if (result?.msg) {
      // 예상 가능한 에외처리
      throw new Error(
        JSON.stringify({
          code: result.statusCode, // BE서버상태코드
          message: result?.msg, // BE서버상태메시지
        }),
      );
    } else {
      console.log("예상치 못한 에러 : ", response);
      // 예상치 못한 에러
      throw new Error(
        JSON.stringify({
          code: result.status, 
          // message: result?.message || result?.error,
          message: "🐶 서버 에러",
        }),
      );
    }
  }
};