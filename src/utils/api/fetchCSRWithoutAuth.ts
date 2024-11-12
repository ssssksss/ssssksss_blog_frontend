import {revalidateTag} from "next/cache";
import {NextRequest} from "next/server";

interface IFetchCSR {
  req: NextRequest;
  url: string;
  body?: Record<string, any>;
  retry?: number;
  next?: NextFetchRequestConfig;
  handleRevalidateTags?: string[];
}

interface ResponseData {
  msg?: string;
  data?: any;
  statusCode: number;
}

export const fetchCSRWithoutAuth = async ({
  req,
  url,
  body,
  retry = 1,
  next,
  handleRevalidateTags,
}: IFetchCSR): Promise<any> => {
  const res = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "omit",
    body: body ? JSON.stringify(body) : undefined,
    next,
  });

  if (!res.ok) {
    throw new Error("API 에러");
  }

  if (!handleRevalidateTags?.length) {
    handleRevalidateTags?.forEach((i) => {
      revalidateTag(i);
    });
  }
  return res;
};
