"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  pageHandler: (currentPage: number) => void;
}

// 버튼 스타일을 공통으로 관리하기 위해 임시로 만든 버튼 컴포넌트
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button = ({children, className, ...props}: ButtonProps) => {
  return (
    <button
      className={`aspect-square w-[2.5rem] rounded-md default-flex ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Pagination = ({currentPage, totalPages, pageHandler}: Props) => {
  const pageList = Array.from({length: totalPages}, (_, index) => index + 1);
  const leftPage = Math.max(currentPage - 2, 1);
  const rightPage = Math.min(leftPage + 4, totalPages);

  return (
    <div className="flex max-w-full flex-nowrap justify-center gap-2 py-4 text-sm max-[480px]:flex-wrap">
      {/* 상단 중앙 페이지 번호 버튼 영역 */}
      <div className="order-3 flex justify-center gap-2 max-[480px]:order-none max-[480px]:w-full">
        {pageList.slice(leftPage - 1, rightPage).map((page) => (
          <Button
            key={page}
            className={`${
              page === currentPage
                ? "primary-set"
                : "primary-border hover:primary-set"
            }`}
            onClick={() => pageHandler(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* 하단 앞뒤 이동 버튼 영역 */}
      <Button
        className={`order-1 max-[480px]:order-none ${
          currentPage === 1
            ? "invisible cursor-not-allowed"
            : "primary-border hover:primary-set"
        }`}
        onClick={() => pageHandler(1)}
        disabled={currentPage === 1}
      >
        <ChevronsLeft size={16} />
      </Button>

      <Button
        className={`order-2 max-[480px]:order-none ${
          currentPage === 1
            ? "invisible cursor-not-allowed"
            : "primary-border hover:primary-set"
        }`}
        onClick={() => pageHandler(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </Button>

      <Button
        className={`order-4 max-[480px]:order-none ${
          currentPage === totalPages
            ? "invisible cursor-not-allowed"
            : "primary-border hover:primary-set"
        }`}
        onClick={() => pageHandler(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </Button>

      <Button
        className={`order-5 max-[480px]:order-none ${
          currentPage === totalPages
            ? "invisible cursor-not-allowed"
            : "primary-border hover:primary-set"
        }`}
        onClick={() => pageHandler(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronsRight size={16} />
      </Button>
    </div>
  );
};

export default Pagination;
