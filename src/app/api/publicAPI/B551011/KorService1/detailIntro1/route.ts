import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const contentId = url.searchParams.get("contentId");
  const contentTypeId = url.searchParams.get("contentTypeId");
  return await fetchApiRoutes({
    url: `http://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=${process.env.OPEN_KOREA_TOURISM_ORGANIZATION}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentId}&contentTypeId=${contentTypeId}&_type=json`,
    req: request,
    isAuth: false,
    isFallbackToErrorPage: false,
  });

}
