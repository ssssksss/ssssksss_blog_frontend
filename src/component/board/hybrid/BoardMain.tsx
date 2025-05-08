"use client";

import Dropdown from "@component/common/dropdown/Dropdown";
import BasicInput from "@component/common/input/BasicInput";
import Pagination from "@component/common/pagination/Pagination";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const sortData = [
  {value: "latest", name: "최신순"},
  {value: "views", name: "조회순"},
  {value: "likes", name: "좋아요순"},
];

interface IBoard {
  id: number;
  title: string;
  createdAt: string;
  views: number;
}

interface IBoardMainProps {
  initialData: {
    data: IBoard[];
    totalElements: number;
    page: number;
  };
}

const BoardMain = ({ initialData }: IBoardMainProps) => {
  const searchParams = useSearchParams();
  const [boardList, setBoardList] = useState<IBoard[]>(initialData.data);
  const [sort, setSort] = useState<string>(searchParams.get("sort") || "latest");
  const [keyword, setKeyword] = useState<string>(
    searchParams.get("keyword") || "",
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [resultCount, setResultCount] = useState(initialData.totalElements);
  const [page, setPage] = useState(
    searchParams.get("page") ? +searchParams.get("page")! : 1,
  );
  const [totalElements, setTotalElements] = useState(initialData.totalElements);
  const router = useRouter();
  const hasFetched = useRef(false);


  const pageHandler = (page: number) => {
    setPage(page);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page + "");
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  const dropdownHandler = (value: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    setSort(value);
    params.set("sort", value);
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };
  
  
  const searchHandler = () => {
    setKeyword(inputRef.current?.value || "");
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", "1");
    setPage(1);

    if (inputRef.current?.value) {
      params.set("keyword", inputRef.current?.value);
    } else {
      params.delete("keyword");
    }
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  const fetchBoardList = async () => {
    const url = new URL(window.location.href);
    const response = await fetch(
      `/api/board/list${decodeURIComponent(url.search)}`,
    );
    if (!response.ok) return;
    const result = await response.json();
    setBoardList(result.data.content);
    setResultCount(result.data.totalElements);
    setTotalElements(result.data.totalElements);
  };
  

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      inputRef.current!.value = searchParams.get("keyword") || "";
      return; // 첫 번째 요청 방지
    }
    fetchBoardList();
  }, [searchParams]);

  return (
    <div
      className={
        "m-auto flex w-full flex-col rounded-2xl px-2 py-4 primary-border"
      }
    >
      <div className="flex w-full flex-col gap-y-2 text-sm">
        <div className="relative w-full">
          <h1 className="text-2xl default-flex"> 게시판 </h1>
          <button
            onClick={() => router.push("board/create")}
            className="absolute right-0 top-1/2 h-[2rem] w-fit -translate-y-1/2 px-2 py-1 primary-border-radius hover:primary-set"
          >
            생성하기
          </button>
        </div>
        <div className={"flex w-full gap-x-2 py-2"}>
          <BasicInput
            type="search"
            placeholder={"검색어를 입력해주세요."}
            className="h-[2.5rem] w-full px-2 py-1 text-sm primary-border-radius"
            ref={inputRef}
            maxLength={30}
          />
          <button
            className="h-[2.5rem] w-[4rem] p-1 text-sm primary-border-radius"
            onClick={() => searchHandler()}
          >
            검색
          </button>
          <Dropdown
            options={sortData}
            value={sort}
            defaultValue={sortData[0].value}
            dropdownHandler={dropdownHandler}
            containerClassName="min-h-[2.5rem] min-w-[6rem] p-1"
          />
        </div>
        <div className="flex h-[4.25rem] w-full items-center justify-between gap-2 pb-1 max-[480px]:flex-col max-[480px]:items-start">
          <div className="flex h-[2rem] items-center gap-x-2">
            검색 결과 수:
            <div className="h-full min-w-[4rem] p-1 primary-border-radius default-flex">
              {resultCount}
            </div>
          </div>
          <div className="flex h-[2rem] items-center gap-x-2">
            검색 키워드 :
            <div className="h-full min-w-[8rem] p-1 primary-border-radius default-flex">
              {keyword || ""}
            </div>
          </div>
        </div>
      </div>
      <div className={"flex-grow"}>
        <ul
          className={
            "flex h-full min-h-[35rem] w-full flex-col gap-y-1 py-2 primary-border-radius"
          }
        >
          <div className="grid w-full grid-cols-[3rem_auto_12rem] gap-x-1 border-b-2 border-primary-100 p-2 text-[20px] max-[480px]:grid-cols-[3rem_auto]">
            <div className="font-bold text-primary-80 default-flex"> 번호 </div>
            <div className="font-bold text-primary-80 default-flex"> 제목 </div>
            <div className="grid grid-cols-2 max-[480px]:col-span-full">
              <div className="font-bold text-primary-80 default-flex max-[480px]:hidden">
                날짜
              </div>
              <div className="font-bold text-primary-80 default-flex max-[480px]:hidden">
                조회순
              </div>
            </div>
          </div>
          <div className="overflow-y-scroll flex flex-col gap-2 p-1">
            {boardList.map((i) => (
              <Link
                href={`board/${i.id}`}
                key={i.id}
                className="group text-md grid w-full cursor-pointer grid-cols-[3rem_auto_12rem] items-center gap-x-1 gap-y-1 rounded-2xl bg-primary-20 px-1 py-2 hover:primary-set max-[480px]:grid-cols-[3rem_auto] max-[480px]:text-sm"
              >
                <div className="max-w-[3rem] overflow-hidden text-ellipsis whitespace-nowrap primary-border-radius default-flex">
                  {i.id}
                </div>
                <div className="max-w-[calc(100%-0.5rem)] items-center overflow-hidden text-ellipsis whitespace-nowrap">
                  {i.title}
                </div>
                <div className="grid grid-cols-2 px-2 font-cookieRunRegular text-black-40 group-hover:primary-set max-[480px]:col-span-full max-[480px]:flex max-[480px]:justify-between">
                  <div className="max-w-[6rem] overflow-hidden text-ellipsis whitespace-nowrap default-flex">
                    {format(new Date(i.createdAt), "yyyy-MM-dd")}
                  </div>
                  <div className="max-w-[6rem] overflow-hidden text-ellipsis whitespace-nowrap text-center">
                    <span className="min-[480px]:hidden min-[480px]:pr-2">
                      조회수 :
                    </span>
                    {i.views}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ul>
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalElements / 10)}
          pageHandler={pageHandler}
        />
      </div>
    </div>
  );
};
export default BoardMain;
