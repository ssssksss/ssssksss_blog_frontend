export const handleToastError = async (response: Response) => {
  if (response.status == 500) {
    return {type: "error", message: "서버 오류"};
  }

  if (response.status === 400) {
    return {type: "error", message: "잘못된 요청"};
  }

  try {
    const result = await response.json();
    return {
      type: "error",
      message:
        result?.msg ||
        result?.message ||
        result?.error ||
        "알 수 없는 에러 발생",
    };
  } catch (e) {
    // JSON 파싱 실패 시 (예: 서버에서 HTML 응답이 올 때)
    return {type: "error", message: "서버 오류: 응답 처리 실패"};
  }
};
