import { format } from "date-fns";
import { useEffect, useState } from "react";

interface WeatherIconProps {
  weatherId: number;
}

const WeatherIcon = ({weatherId}: WeatherIconProps) => {
  const icons = {
    clear: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" fill="currentColor" />
        <path
          d="M12 2V4M12 20V22M2 12H4M20 12H22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    clouds: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 15C3 17.7614 5.23858 20 8 20H16C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C15.9666 10 15.9334 10.0004 15.9004 10.0012C15.4373 7.17167 12.9792 5 10 5C6.68629 5 4 7.68629 4 11C4 11.3496 4.02911 11.6924 4.08495 12.0273C3.43811 12.1885 2.84961 12.4926 2.35804 12.9087C2.13025 13.1067 2 13.4191 2 13.7438V14C2 14.5523 2.44772 15 3 15Z"
          fill="currentColor"
        />
      </svg>
    ),
    rain: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 15.5C20 18.5376 17.5376 21 14.5 21C11.4624 21 9 18.5376 9 15.5C9 12.4624 14.5 6 14.5 6C14.5 6 20 12.4624 20 15.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  };

  const getIcon = (id: number) => {
    if (id >= 200 && id < 600) return icons.rain;
    if (id >= 600 && id < 700) return icons.clouds;
    if (id === 800) return icons.clear;
    return icons.clouds;
  };

  return (
    <div className="text-black h-full default-flex">{getIcon(weatherId)}</div>
  );
};

interface ForecastData {
  date: string;
  avgTemp: string;
  minTemp: string;
  maxTemp: string;
  mainWeather: {id: number; description: string};
  avgHumidity: string;
  maxPop: string;
}

const PlanHomeWeather = () => {
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/plan/weather?date=${format(new Date(), "yyyy-MM-dd")}`,
          {
            credentials: "omit",
            cache: "force-cache",
          },
        );
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        const dailyData = processForecastData(data.list);
        setForecast(dailyData);
      } catch (err) {
        setError("날씨 정보를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const processForecastData = (list: any[]): ForecastData[] => {
    const dailyData: Record<
      string,
      {
        temps: number[];
        weather: {id: number; description: string}[];
        humidity: number[];
        pop: number[];
      }
    > = {};

    // 오늘 날짜를 기준으로 시작
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    list.forEach((item) => {
      const itemDate = new Date(item.dt * 1000);
      itemDate.setHours(0, 0, 0, 0);
      const date = itemDate.toLocaleDateString();

      // 오늘 이후의 데이터만 처리
      if (itemDate >= today) {
        if (!dailyData[date]) {
          dailyData[date] = {
            temps: [],
            weather: [],
            humidity: [],
            pop: [],
          };
        }

        dailyData[date].temps.push(item.main.temp);
        dailyData[date].weather.push(item.weather[0]);
        dailyData[date].humidity.push(item.main.humidity);
        dailyData[date].pop.push(item.pop * 100);
      }
    });

    // 날짜순으로 정렬하여 앞으로의 3일만 반환
    return Object.entries(dailyData)
      .sort(([dateA], [dateB]) => {
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      })
      .slice(0, 3)
      .map(([date, data]) => ({
        date,
        avgTemp: (
          data.temps.reduce((a, b) => a + b, 0) / data.temps.length
        ).toFixed(1),
        minTemp: Math.min(...data.temps).toFixed(1),
        maxTemp: Math.max(...data.temps).toFixed(1),
        mainWeather: data.weather[Math.floor(data.weather.length / 2)],
        avgHumidity: (
          data.humidity.reduce((a, b) => a + b, 0) / data.humidity.length
        ).toFixed(0),
        maxPop: Math.max(...data.pop).toFixed(0),
      }));
  };

  if (loading)
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex h-4 items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="sm:text-md grid h-[calc(100%-3rem)] w-full grid-cols-1 items-start gap-2 rounded-[1rem] p-2 text-sm glassmorphism lg:grid-cols-3">
      {forecast.map((day, index) => (
        <div key={index} className="rounded-2xl shadow-2xl">
          {/* 날짜 헤더 */}
          <div className="p-1">
            <h3 className="rounded-t-[.5rem] bg-green-80 py-[.25rem] text-center font-cookieRunRegular text-lg text-white-100">
              {new Date(day.date).toLocaleDateString("ko-KR", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}

            </h3>
          </div>

          {/* 날씨 정보 */}
          <div className="h-auto max-h-[13.125rem] p-2">
            {/* 온도 및 날씨 아이콘 */}
            <div className="flex h-full items-center justify-center space-x-1">
              <div className={"flex h-full w-12 items-center"}>
                <WeatherIcon weatherId={day.mainWeather.id} />
              </div>
              <div className="w-full">
                <p className="font-bold text-gray-800"> 평균 {day.avgTemp}°C</p>
                <p className="text-sm text-gray-600">최저 {day.minTemp}°C</p>
                <p className="text-sm text-gray-600">최고 {day.maxTemp}°C</p>
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="mt-4 flex flex-col gap-y-2">
              {/* 강수 확률 */}
              <div className="flex items-center justify-between rounded-lg p-1 glassmorphism">
                <span className="text-gray-700">강수 확률</span>
                <span className="font-semibold text-blue-600">
                  {day.maxPop}%
                </span>
              </div>

              {/* 습도 */}
              <div className="flex items-center justify-between rounded-lg p-1 glassmorphism">
                <span className="text-gray-700">습도</span>
                <span className="font-semibold text-blue-600">
                  {day.avgHumidity}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanHomeWeather;
