
export const handleResponseError = async (response: Response) => {
  try {
    if (response.status === 400) {
      return new Response(
        JSON.stringify({
          error: {
            message: "잘못된 요청",
            code: 400,
          },
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
    if (response.status === 401) {
      return new Response(
        JSON.stringify({
          error: {
            message: "인증에 실패했습니다.",
            code: 401,
          },
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
    if (response.status === 403) {
      return new Response(
        JSON.stringify({
          error: {
            message: "권한이 없습니다.",
            code: 403,
          },
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
    if (response.status === 404) {
      return new Response(
        JSON.stringify({
          error: {
            message: "잘못된 요청",
            code: 404,
          },
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
    if (response.status === 500) {
      return new Response(
        JSON.stringify({
          error: {
            message: "서버 요청 문제",
            code: 500,
          },
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  } catch {
    throw new Error("서버 에러");
  }

};