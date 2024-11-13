import {fetchCSRWithoutAuth} from "@utils/api/fetchCSRWithoutAuth";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const contentId = url.searchParams.get("contentId");
  const contentTypeId = url.searchParams.get("contentTypeId");
  const apiResponse = await fetchCSRWithoutAuth({
    url: `http://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=${process.env.OPEN_KOREA_TOURISM_ORGANIZATION}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentId}&contentTypeId=${contentTypeId}&_type=json`,
    req: request,
  });

  // 응답 데이터를 JSON으로 변환
  const data = await apiResponse.json();

  // NextResponse로 JSON 반환
  return NextResponse.json(data);
}
