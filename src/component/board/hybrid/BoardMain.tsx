"use client";

import Dropdown from "@component/common/dropdown/Dropdown";
import BasicInput from "@component/common/input/BasicInput";
import Pagination from "@component/common/pagination/Pagination";
import useUserStore from "@store/userStore";
import { formatViewCount } from "@utils/function/formatViewCount";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const sortData = [
  {value: "latest", name: "최신순"},
  {value: "views", name: "조회순"},
  // {value: "likes", name: "좋아요순"},
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

const updateSearchParam = (key: string, value?: string | number) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  if (value !== undefined && value !== "") {
    params.set(key, value.toString());
  } else {
    params.delete(key);
  }
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());
};

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
  const userStore = useUserStore();

  const pageHandler = (page: number) => {
    setPage(page);
    updateSearchParam("page", page);
    document.title =
      page === 1 ? "게시판" : `게시판 - ${page}페이지`;
  };

  const dropdownHandler = (value: string) => {
    setSort(value);
    updateSearchParam("sort", value);
  };
  
  
  const searchHandler = () => {
    const value = inputRef.current?.value || "";
    setKeyword(inputRef.current?.value || "");
    setPage(1);
    updateSearchParam("page", 1);
    updateSearchParam("keyword", value);
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
    <div className="m-auto flex w-full flex-col rounded-2xl px-2 py-2">
      <div className="flex w-full flex-col gap-y-2 text-sm">
        <div className="relative w-full">
          <h1 className="text-2xl default-flex">게시판 목록</h1>
          {userStore.id > 0 && (
            <button
              onClick={() => router.push("board/create")}
              className="absolute right-0 top-1/2 h-[2rem] w-fit -translate-y-1/2 px-2 py-1 primary-border-radius hover:primary-set"
              aria-label="게시글 작성"
            >
              생성하기
            </button>
          )}
        </div>

        <div className="flex h-btn-md w-full gap-x-2 max-[480px]:gap-x-1">
          <label htmlFor="board-search" className="sr-only">
            검색어 입력
          </label>
          <BasicInput
            id="board-search"
            type="search"
            placeholder="검색어를 입력해주세요."
            className="h-btn-md w-full px-2 py-1 text-sm primary-border-radius"
            ref={inputRef}
            maxLength={30}
            onKeyPressAction={searchHandler}
          />
          <button
            className="h-btn-md w-[4rem] p-1 text-sm primary-border-radius"
            onClick={searchHandler}
            aria-label="검색 실행"
          >
            검색
          </button>
          <Dropdown
            options={sortData}
            value={sort}
            defaultValue={sortData[0].value}
            dropdownHandler={dropdownHandler}
            containerClassName="h-btn-md p-1 max-[480px]:w-[4rem] w-[6rem] rounded-[.5rem]"
          />
        </div>

        <div className="mb-2 flex h-btn-sm w-full items-center gap-2 max-[480px]:h-[4.25rem] max-[480px]:flex-col max-[480px]:items-start">
          <div className="flex h-btn-sm items-center gap-x-2">
            검색 키워드:
            <div className="h-full min-w-[4rem] px-4 primary-border-radius default-flex">
              {keyword || ""}
            </div>
          </div>
          <div className="flex h-btn-sm items-center gap-x-2">
            검색 결과 수:
            <div className="h-full min-w-[4rem] px-4 primary-border-radius default-flex">
              {formatViewCount(resultCount || 0)}
            </div>
          </div>
        </div>
      </div>

      {boardList.length > 0 ? (
        <>
          <div className="flex-grow">
            <ul className="flex h-full min-h-[32rem] w-full flex-col gap-y-1 py-2 primary-border-radius">
              <li className="grid w-full grid-cols-[3rem_auto_12rem] gap-x-1 border-b-2 border-primary-100 p-2 text-[20px] max-[480px]:grid-cols-[3rem_auto]">
                <span className="font-bold default-flex">번호</span>
                <span className="font-bold default-flex">제목</span>
                <div className="grid grid-cols-2 max-[480px]:col-span-full">
                  <span className="font-bold default-flex max-[480px]:hidden">
                    날짜
                  </span>
                  <span className="font-bold default-flex max-[480px]:hidden">
                    조회수
                  </span>
                </div>
              </li>
              {boardList.map((i) => (
                <li key={i.id}>
                  <Link
                    href={`board/${i.id}`}
                    className="text-md group grid w-full cursor-pointer grid-cols-[2.5rem_auto_12rem] items-center gap-x-1 gap-y-1 rounded-2xl px-1 py-2 hover:bg-primary-80 hover:text-primary-contrast max-[480px]:grid-cols-[2.5rem_auto] max-[480px]:text-sm"
                    aria-label={`게시글 ${i.title}로 이동`}
                  >
                    <span className="overflow-hidden whitespace-nowrap rounded-2xl border border-primary-contrast text-sm default-flex">
                      {i.id}
                    </span>
                    <span className="truncate">{i.title}</span>
                    <div className="grid grid-cols-2 px-2 font-cookieRunRegular max-[480px]:col-span-full max-[480px]:flex max-[480px]:justify-between">
                      <span className="max-w-[6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm default-flex">
                        {format(new Date(i.createdAt), "yyyy-MM-dd")}
                      </span>
                      <span className="max-w-[6rem] overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm">
                        <span className="pr-1 min-[480px]:hidden">조회수:</span>
                        {formatViewCount(i.views)}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(totalElements / 10)}
              pageHandler={pageHandler}
            />
          </div>
        </>
      ) : (
        <div className="flex h-full min-h-[35rem] w-full flex-col gap-y-1 py-2 primary-border-radius default-flex">
          아무런 내용이 없습니다.
        </div>
      )}
    </div>
  );
};
export default BoardMain;
