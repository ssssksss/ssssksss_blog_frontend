interface IFetchMultipartRetry {
  url: string; // /api경로 와 같이 /로 시작할것
  method?: string;
  formData?: FormData;
}

export const fetchMultipartRetry = async ({
  url,
  method,
  formData,
}: IFetchMultipartRetry) => {
  const res = await fetch("/api/auth/cookies");
  const cookies = await res.json();
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
    {
      method: method || "GET",
      headers: {
        Authorization: `Bearer ${cookies?.accessToken}`,
      },
      body: formData,
    },
  );
  if (response.status == 401) {
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/accessToken`,
      {
        method: "GET",
        headers: {
          Cookie: `${cookies?.refreshToken?.name}=${cookies?.refreshToken?.value}`,
        },
        credentials: "include",
      },
    );
    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      const newAccessToken = data.data;
      response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${newAccessToken}`, // 새 액세스 토큰 사용
        },
        credentials: "include",
        body: formData,
      });
    } else {
      throw new Error("Failed to refresh access token");
    }
  }

  return response;
};