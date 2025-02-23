export const handleResponseError = async (response: Response) => {
  if (!response.status) {
    throw new Error(
      JSON.stringify({
        code: 500,
        message: "네트워크오류 혹은 CORS 문제",
      }),
    );
  }

  if (!response?.ok) {
    const result = await response.json();
    if (result?.msg) {
      // 예상 가능한 에러
      throw new Error(
        JSON.stringify({
          code: result.statusCode, // BE서버상태코드
          message: result?.msg, // BE서버상태메시지
        }),
      );
    } else {
      // BE에서 예외, 예상치 못한 에러
      throw new Error(
        JSON.stringify({
          code: result.status, // BE에서 예외로 처리
          message: result?.message || result?.error, // BE에서 예외로 처리
        }),
      );
    }
  }
};