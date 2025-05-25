"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useCallback, useEffect } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  pageHandler: (currentPage: number) => void;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`aspect-square w-[2.5rem] rounded-md default-flex ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Pagination = ({ currentPage, totalPages, pageHandler }: Props) => {
  const pageList = Array.from({ length: totalPages }, (_, index) => index + 1);
  const leftPage = Math.max(currentPage - 2, 1);
  const rightPage = Math.min(leftPage + 4, totalPages);

  // ⌨️ 방향키 이벤트 핸들러
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentPage > 1) {
        pageHandler(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < totalPages) {
        pageHandler(currentPage + 1);
      }
    },
    [currentPage, totalPages, pageHandler]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex max-w-full flex-nowrap justify-center gap-2 py-4 text-sm max-[480px]:flex-wrap">
      {/* 페이지 번호 버튼 */}
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
            aria-label={`${page}번째 페이지 이동`}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* 앞뒤 이동 버튼 */}
      <Button
        className={`order-1 max-[480px]:order-none ${
          currentPage === 1
            ? "invisible cursor-not-allowed"
            : "primary-border hover:primary-set"
        }`}
        onClick={() => pageHandler(1)}
        disabled={currentPage === 1}
        aria-label="첫 페이지로 이동"
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
        aria-label="이전페이지 이동"
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
        aria-label="다음페이지 이동"
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
        aria-label="마지막 페이지로 이동"
      >
        <ChevronsRight size={16} />
      </Button>
    </div>
  );
};

export default Pagination;
