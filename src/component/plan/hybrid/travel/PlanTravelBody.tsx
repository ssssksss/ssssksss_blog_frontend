"use client";

import Button from "@component/common/button/hybrid/Button";
import Input from "@component/common/input/Input";
import Image from "next/image";
import {useRef, useState} from "react";

export interface Test {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  createdtime: string;
  firstimage: string;
  firstimage2: string;
  cpyrhtDivCd: string;
  mapx: number;
  mapy: number;
  mlevel: string;
  modifiedtime: string;
  sigungucode: string;
  tel: string;
  title: string;
}

interface IPlanTravelBody {}
const PlanTravelBody = (props: IPlanTravelBody) => {
  const [data, setData] = useState<Test[]>([]);
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState<Test[]>([]);
  const keywordRef = useRef<HTMLInputElement>(null);
  const fetchTouristInfo = async () => {
    const apiKey =
      "vAwFM4z%2Fo%2BMQakACFL3w%2FfONa48lFzFlvX9aOPl%2BUamrPbv0AW%2BeyjBDWkJvadK843ukwBUc8JeT3Yr3wGU8MA%3D%3D"; // 자신의 API 키를 입력하세요.
    // const keyword = "서울"; // 검색 키워드
    const url = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${apiKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppName&keyword=${encodeURIComponent("")}&_type=json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("API 요청 실패: " + response.statusText);
      }
      const data = await response.json();
      const items = data.response.body.items.item;
      setData(items);
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  };

  return (
    <div className={"flex h-auto w-full flex-col gap-y-2 pr-2"}>
      <div className="flex h-[3rem] min-h-[3rem] items-center gap-x-2">
        <Input
          ref={keywordRef}
          onChange={(e) => setKeyword(e.target.value)}
          className="h-full w-full default-outline"
          placeholder="키워드를 입력해주세요"
        />
        <button
          onClick={() => fetchTouristInfo()}
          className="h-full w-12 flex-shrink-0 rounded-[1rem] px-1 outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-60">
          버튼
        </button>
      </div>

      <ul className={"grid w-full grid-cols-2 p-4 default-outline"}>
        {data.map((i, index) => (
          <li
            key={i.contentid}
            className="bg-white w-full max-w-md overflow-hidden rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-bold">
                {i?.title}
                <Button
                  className="default-outline"
                  onClick={() => setList([...list, i])}>
                  추가
                </Button>
              </h2>
              <div className="relative aspect-square w-[10rem]">
                <Image
                  alt=""
                  src={i.firstimage || "/images/icons/ic-plane.svg"}
                  fill
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ul className="p-2">
        {list.map((i, index) => (
          <li key={index} className="w-full py-2">
            {index + 1} : {i.title} , x: {i.mapx} , y: {i.mapy}
          </li>
        ))}
      </ul>
      {/* <div>
        {list.length > 0 &&
          Object.entries(list[0]).map((i, index) => (
            <div key={index}>
              {i[0]} : {i[1]}
            </div>
          ))}
      </div>
      <div className="relative py-8">
        <PlanTravelKakaoMap data={list} />
      </div> */}
    </div>
  );
};
export default PlanTravelBody;
