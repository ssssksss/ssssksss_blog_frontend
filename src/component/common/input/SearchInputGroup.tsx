import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ThemeInput1 from "../input/ThemeInput1";


interface SearchInputGroupProps {
  onSearch: (keyword: string) => void;
  wrapperClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  placeholder?: string;
  maxLength?: number;
}

const SearchInputGroup = forwardRef<HTMLInputElement, SearchInputGroupProps>(
  (
    {
      onSearch,
      wrapperClassName = "",
      inputClassName = "",
      buttonClassName = "",
      placeholder = "검색어를 입력하세요",
      maxLength = 50,
    },
    ref,
  ) => {
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [lastSearchValue, setLastSearchValue] = useState("");

    // 내부 ref
    const inputRef = useRef<HTMLInputElement>(null);

    // 외부에서 ref 사용할 수 있도록 연결
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleSearch = async () => {
      const trimmed = inputValue.trim();
      if (trimmed === "" || trimmed === lastSearchValue) return;

      if (loading) return; // 중복 방지

      try {
        setLoading(true);
        await onSearch(trimmed);
        setLastSearchValue(trimmed);
      } finally {
        setLoading(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        handleSearch(); // 이제 로딩 포함
      }
      if (e.key === "Escape") {
        setInputValue("");
      }
    };

    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
      handleSearch(); // 로딩은 handleSearch에서 관리
    };
    

    return (
      <div
        className={`grid w-full grid-cols-[auto_3rem] items-center gap-x-2 py-2 ${wrapperClassName}`}
      >
        <ThemeInput1
          ref={inputRef}
          type="text"
          className={`h-full w-full ${inputClassName}`}
          placeholder={placeholder}
          maxLength={maxLength}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          role="button"
          aria-busy={loading}
          className={`default-flex h-full aspect-square disabled:cursor-not-allowed p-2 disabled:disabled-set ${loading && "primary-set"} primary-border-radius hover:bg-primary-20`}
          disabled={loading}
          onClick={handleConfirm}
        >
          {loading ? (
            <div className="h-full w-full default-flex">
              <div className="border-white-500 aspect-square h-full animate-spin rounded-full border-2 border-t-transparent"></div>
            </div>
          ) : (
            <FaSearch size={`${"24"}`} />
          )}
        </button>
      </div>
    );
  },
);

SearchInputGroup.displayName = "SearchInputGroup"; // forwardRef 사용 시 필수

export default SearchInputGroup;
