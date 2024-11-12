"use client";

import Blog2Search from "@component/blog2/view/Blog2Search";
import usePreventBodyScroll from "@hooks/usePreventBodyScroll";
import useWindowClick from "@hooks/useWindowClick";
import {useRef, useState} from "react";

interface IBlog2SearchContainer {}
const Blog2SearchContainer = (props: IBlog2SearchContainer) => {
  const [isOpenBlogItemList, setIsOpenBlogItemList] = useState(false);
  const [, setIsInputChange] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  useWindowClick(() => setIsOpenBlogItemList(false));
  usePreventBodyScroll(isOpenBlogItemList);

  //   const {
  //     data: blogListResData,
  //     fetchNextPage,
  //     hasNextPage,
  //     isFetching,
  //     isError,
  //   } = BlogAPI.getSearchBlogList(
  //     inputRef.current?.value || '',
  //     isOpenBlogItemList,
  //     () => {
  //       setIsInputChange(false);
  //     },
  //   );

  //   const infiniteScrollRef = useIntersection((entry, observer) => {
  //     observer.unobserve(entry.target);
  //     if (isError) {
  //       setIsOpenBlogItemList(false);
  //       store.dispatch(
  //         rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
  //           type: 'error',
  //           message: '서버 에러로 검색 불가능',
  //         }),
  //       );
  //       return null;
  //     }
  //     if (hasNextPage && !isFetching) fetchNextPage();
  //   });

  //   const SearchHandler = () => {
  //     setIsOpenBlogItemList(true);
  //     setIsInputChange(true);
  //   };

  return (
    <>
      <Blog2Search />
    </>
  );
};
export default Blog2SearchContainer;
