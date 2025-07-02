import Blog2DetailContainer from "@component/blog2/hybrid/read/Blog2DetailContainer";
import { fetchServerSideInServerComponent } from "@utils/api/fetchServerSideInServerComponent";
import ErrorPage from "@utils/error/ErrorPage";
import { cookies } from "next/headers";
import Template from "../template";

export async function generateMetadata({ params: { id } }: {params: { id: string }}) {
  const pageId = Number(id);
  if (pageId <= 0 || !Number.isSafeInteger(pageId)) {
    throw new Error(
      JSON.stringify({
        code: 400,
        message: "잘못된 경로",
      }),
    );
  }

  return {
    title: `블로그2 상세페이지 - ${pageId}`,
    description: "블로그2의 상세 페이지",
  };
}


function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );
  return Buffer.from(padded, "base64").toString("utf8");
}

export function decodeRefreshToken(refreshToken: string) {
  const token = refreshToken;
  if (!token) {
    throw new Error("refreshToken not found");
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  const [header, payload] = parts;

  const decodedHeader = JSON.parse(base64UrlDecode(header));
  const decodedPayload = JSON.parse(base64UrlDecode(payload));

  return {
    header: decodedHeader,
    payload: decodedPayload,
  };
}

async function getData(id: number) {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  let _role = null;
  if (refreshToken) {
    const decoded = decodeRefreshToken(refreshToken.value);
    _role = decoded.payload.role;
  }
  if (refreshToken && _role == "ROLE_ADMIN") {
    const response = await fetchServerSideInServerComponent({
      url: `${process.env.BACKEND_URL}/api/blog2/${id}`,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    return response.json();
  } else {
    const response = await fetchServerSideInServerComponent({
      url: `${process.env.BACKEND_URL}/api/blog2/${id}`,
      isAuth: false,
      next: {
        revalidate: 3600,
        tags: [`blog2-${id}`],
      },
    });
    return response.json();
  }
}

export default async function page({ params: { id } }: { params: { id: string } }) {
  const result = await getData(Number(id));

  if (result?.error) {
    return <ErrorPage error={result.error} />;
  }

  return (
    <Template>
      {
        result.data &&
        <Blog2DetailContainer data={result?.data} />
      }
    </Template>
  );
}