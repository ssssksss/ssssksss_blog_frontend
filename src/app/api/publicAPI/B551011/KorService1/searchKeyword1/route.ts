import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword") || "";

  // 외부 API 호출
  const apiResponse = await fetch(
    `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${process.env.OPEN_KOREA_TOURISM_ORGANIZATION}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppName&keyword=${decodeURIComponent(
      keyword,
    )}&_type=json`,
  );

  // 응답 데이터를 JSON으로 변환
  const data = await apiResponse.json();

  // NextResponse로 JSON 반환
  return NextResponse.json(data);
}
