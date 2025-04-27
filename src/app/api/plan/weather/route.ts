import { fetchApiRoutes } from "@utils/api/fetchApiRoutes";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return await fetchApiRoutes({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&units=metric&appid=${process.env.OPEN_WEATHER_MAP_API}`,
    req: request,
    isAuth: false,
    isFallbackToErrorPage: false,
  });
}
