import Blog2DetailBox from "@component/blog2/hybrid/read/Blog2DetailBox";
import { cookies } from "next/headers";
import Template from "../template";

async function getData(id: number) {
  let accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken");

  // 액세스 토큰을 가져오는 함수
  const fetchAccessToken = async () => {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/user/accessToken`,
      {
        method: "GET",
        headers: {
          Cookie: `${refreshToken?.name}=${refreshToken?.value}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const data = await response.json();
    accessToken = data.accessToken;

    // 새로운 accessToken을 쿠키에 저장
    document.cookie = `accessToken=${accessToken}; path=/`;
  };

  // 데이터 가져오기 함수
  const fetchData = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/blog2/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {revalidate: 3600, tags: [`getBlog2/${id}`]},
    });

    if (!response.ok) {
      // 401 Unauthorized 에러가 발생할 경우
      if (response.status === 401 && refreshToken) {
        await fetchAccessToken(); // 토큰 갱신
        return fetchData(); // 갱신된 토큰으로 재요청
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json() as Promise<any>;
  };

  return fetchData();
}

export async function generateMetadata({ params: { id } }: {params: { id: string }}) {
  const pageId = Number(id);
  if (pageId <= 0 || !Number.isSafeInteger(pageId)) {
    throw Error("Not Found");
  }

  return {
    title: `블로그2 상세페이지 - ${pageId}`,
    description: "블로그2의 상세 페이지",
  };
}

export default async function page({ params: { id } }: { params: { id: string } }) {
  const pageId = Number(id);
  if (pageId < 1 || !Number.isSafeInteger(pageId)) {
    throw Error("Not Found");
  }

  const result: {
        data: responseReadBlog2,
            msg: string;    
            statusCode: number;
  } = await getData(pageId);
  
  return (
    <Template>
      <Blog2DetailBox data={result.data} />
    </Template>
  );
}