"use client";

import Dropdown from "@component/common/dropdown/Dropdown";
import Pagination from "@component/common/pagination/Pagination";
import {format} from "date-fns";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useRef, useState} from "react";

const sortData = [
  {
    value: "latest",
    name: "최신순",
  },
  {
    value: "views",
    name: "조회순",
  },
  {
    value: "likes",
    name: "좋아요순",
  },
];

interface IBoardMain {}
const BoardMain = (props: IBoardMain) => {
  const searchParams = useSearchParams();
  const [boardList, setBoardList] = useState<IBoard[]>([]);
  const [sort, setSort] = useState<string>("최신순");
  const [keyword, setKeyword] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [resultCount, setResultCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const router = useRouter();

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

    if (inputRef.current?.value) {
      params.set("keyword", inputRef.current?.value);
    } else {
      params.delete("keyword");
    }
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    setSort(params.get("sort") || sortData[0].value);
    setKeyword(params.get("keyword") || "");
    setPage(Number(params.get("page")) || 1);
  }, []);

  useEffect(() => {
    const temp = async () => {
      const url = new URL(window.location.href);
      const response = await fetch(
        `/api/board/list${decodeURIComponent(url.search)}`,
      );
      if (!response.ok) {
        return;
      }
      const result: IResponseReadBoardList = await response.json();
      setBoardList(result.data.content);
      setResultCount(result.data.totalElements);
      setTotalElements(result.data.totalElements);
    };
    temp();
  }, [searchParams]);

  return (
    <div className={"m-auto flex w-full flex-col"}>
      <div className="flex w-full flex-col gap-y-2 text-sm">
        <div className="relative w-full">
          <h1 className="text-2xl default-flex"> 게시판 </h1>
          <button
            onClick={() => router.push("board/create")}
            className="absolute right-0 top-1/2 h-[2rem] w-fit -translate-y-1/2 px-2 py-1 default-outline">
            생성하기
          </button>
        </div>
        <div className={"flex w-full gap-x-2 py-2"}>
          <input
            type="search"
            placeholder={"검색어를 입력해주세요."}
            className="h-[2.5rem] w-full px-2 py-1 text-sm default-outline"
            ref={inputRef}
            maxLength={30}
          />
          <button
            className="h-[2.5rem] w-[4rem] p-1 text-sm default-outline"
            onClick={() => searchHandler()}>
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
        <div className="flex h-[3.5rem] w-full items-center gap-x-2 pb-1">
          <div className="flex h-[2rem] items-center gap-x-2">
            검색 결과 수:
            <div className="h-full min-w-[4rem] p-1 default-outline default-flex">
              {resultCount}
            </div>
          </div>
          <div className="flex h-[2rem] items-center gap-x-2">
            검색 키워드 :
            <div className="h-full min-w-[8rem] p-1 default-outline default-flex">
              {keyword || ""}
            </div>
          </div>
        </div>
      </div>
      <div className={"flex-grow"}>
        <ul
          className={
            "h-full max-h-[35rem] min-h-[35rem] w-full overflow-y-scroll py-2 default-outline"
          }>
          <div className="mb-[.5rem] grid w-full grid-cols-[3rem_auto_6rem_6rem] gap-x-1 border-b-2 p-2 text-[20px]">
            <div className="font-bold text-primary-80 default-flex"> 번호 </div>
            <div className="font-bold text-primary-80 default-flex"> 제목 </div>
            <div className="font-bold text-primary-80 default-flex"> 날짜 </div>
            <div className="font-bold text-primary-80 default-flex">조회순</div>
          </div>
          {boardList.map((i) => (
            <Link
              href={`board/${i.id}`}
              key={i.id}
              className="grid h-[3rem] w-full cursor-pointer grid-cols-[3rem_auto_6rem_6rem] items-center gap-x-1 gap-y-1 rounded-md px-2 hover:bg-primary-20">
              <div className="max-w-[3rem] overflow-hidden text-ellipsis whitespace-nowrap default-outline default-flex">
                {i.id}
              </div>
              <div className="max-w-[calc(100%-0.5rem)] items-center overflow-hidden text-ellipsis whitespace-nowrap">
                {i.title}
              </div>
              <div className="max-w-[6rem] overflow-hidden text-ellipsis whitespace-nowrap default-flex">
                {format(new Date(i.createdAt), "yyyy-MM-dd")}
              </div>
              <div className="max-w-[6rem] overflow-hidden text-ellipsis whitespace-nowrap text-center">
                {i.views}
              </div>
            </Link>
          ))}
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
