
interface IFetchMultipartRetry {
  url: string; // /api경로 와 같이 /로 시작할것
  method?: string;
  formData?: FormData;
  handleRevalidateTags?: string[];
}

export const fetchMultipartRetry = async ({
  url,
  method,
  formData,
  handleRevalidateTags,
}: IFetchMultipartRetry) => {
  const res = await fetch("/api/auth/cookies");
  const cookies = await res.json();
  let response;
  if (cookies?.accessToken) {
    response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
      method: method || "GET",
      headers: {
        Authorization: `Bearer ${cookies?.accessToken}`,
      },
      body: formData,
    });
  } else {
    const refreshResponse = await fetch("/api/user/accessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      const newAccessToken = data.data;
      response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${newAccessToken}`, // 새 액세스 토큰 사용
        },
        // credentials: "include",
        body: formData,
      });
    } else {
      throw new Error("Failed to refresh access token");
    }
  }
  if (handleRevalidateTags?.length) {
    await fetch("/api/revalidate", {
      method: "POST",
      body: JSON.stringify({tags: handleRevalidateTags}),
      headers: {"Content-Type": "application/json"},
    });
  }

  return response;
};
