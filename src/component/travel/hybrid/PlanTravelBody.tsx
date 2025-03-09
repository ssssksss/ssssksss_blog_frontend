"use client";

import Button from "@component/common/button/hybrid/Button";
import Input from "@component/common/input/Input";
import useToastifyStore from "@store/toastifyStore";
import Image from "next/image";
import { useRef, useState } from "react";

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
  const toastifyStore = useToastifyStore();
  const fetchTouristInfo = async () => {
    try {
      const response = await fetch(
        `/api/publicAPI/B551011/KorService1/searchKeyword11?keyword=${keyword}`,
      );
      if (!response.ok) {
        throw new Error("API 요청 실패: " + response.statusText);
      }
      const data = await response.json();
      const items = data.response.body.items.item;
      setData(items);
      toastifyStore.setToastify({
        message: "검색 되었습니다."
      });
    } catch (error) {
      toastifyStore.setToastify({
        type: "error",
        message: "검색 실패.",
      });
    }
  };

  return (
    <div className={"flex h-full w-full flex-col gap-y-2 pr-2 pt-2"}>
      <h2 className="text-[20px] default-flex"> 여행 일정 </h2>
      <div className="flex h-[3rem] min-h-[3rem] items-center gap-x-2">
        <Input
          ref={keywordRef}
          onChange={(e) => setKeyword(e.target.value)}
          className="h-full w-full primary-border-radius"
          placeholder="키워드를 입력해주세요"
        />
        <button
          onClick={() => fetchTouristInfo()}
          className="h-full w-12 flex-shrink-0 rounded-[1rem] px-1 outline-primary-60"
        >
          버튼
        </button>
      </div>

      <ul className={"grid w-full flex-grow grid-cols-2 p-4 primary-border-radius"}>
        {data.map((i, index) => (
          <li
            key={i.contentid}
            className="bg-white w-full max-w-md overflow-hidden rounded-lg shadow-md"
          >
            <div className="p-6">
              <h2 className="mb-4 text-xl font-bold">
                {i?.title}
                <Button
                  className="primary-border-radius"
                  onClick={() => setList([...list, i])}
                >
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
    </div>
  );
};
export default PlanTravelBody;
