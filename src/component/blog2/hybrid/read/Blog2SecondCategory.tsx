"use client";

import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import useBlog2Store from "src/store/blog2Store";
import useUserStore from "src/store/userStore";
import Blog2SecondCategoryModal from "./Blog2SecondCategoryModal";

const Blog2SecondCategory = (props: {categoryList: IBlog2FirstCategory[]}) => {
  const blogSecondCategoryVerticalScrollRef = useRef<HTMLDivElement>(null);
  const userStore = useUserStore();
  const blog2Store = useBlog2Store();
  const searchParams = useSearchParams();


  console.log("Blog2SecondCategory.tsx 파일 : ",props.categoryList);

  // 카테고리 중 버튼을 클릭하게 되면 버튼이 브라우저의 중앙으로 위치하게 해준다.
  const onClickAdjustHorizontalScroll = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    handler: () => void,
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    handler();
    if (ref.current) {
      ref.current.scrollLeft =
        e.currentTarget.offsetLeft +
        e.currentTarget.offsetWidth / 2 -
        (e.currentTarget.offsetParent as HTMLElement).offsetWidth / 2;
    }
  };

  // 2번째 주소 변경 및 카테고리 목록을 불러온다.
  const handleSecondCategoryClick = (id: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("secondCategoryId", id + "");
    blog2Store.setBlog2ActiveSecondCategoryId(id);
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    blog2Store.setBlog2CategoryList(props.categoryList);
    if (!searchParams.get("firstCategoryId")) {
      if (props.categoryList.length > 0) {
        if (props.categoryList[0].blog2SecondCategoryList!.length > 0) {
          handleSecondCategoryClick(
            props.categoryList[0].blog2SecondCategoryList![0].id,
          );
        }
      }
    } else if (searchParams.get("firstCategoryId")) {
      if (props.categoryList.length > 0) {
        if (
          props.categoryList.filter(
            (i) => i.id == Number(searchParams.get("firstCategoryId")),
          )[0].blog2SecondCategoryList!.length > 0
        ) {
          handleSecondCategoryClick(
            Number(searchParams.get("secondCategoryId")),
          );
        }
      }
    }
  }, []);

  return (
    <div
      className={
        "flex min-h-[3.5rem] items-center gap-[.5rem] overflow-hidden overflow-x-scroll whitespace-nowrap scrollbar-hide"
      }
      ref={blogSecondCategoryVerticalScrollRef}
    >
      {blog2Store.categoryList.map(
        (el) =>
          el.id == blog2Store.activeBlog2FirstCategoryId &&
          el.blog2SecondCategoryList?.map((el2) => (
            <ThemeActiveButton1
              className={"h-[3rem] px-4 py-2"}
              isActive={el2.id == blog2Store.activeBlog2SecondCategoryId}
              key={el2.id}
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
                onClickAdjustHorizontalScroll(
                  e,
                  () => handleSecondCategoryClick(el2.id),
                  blogSecondCategoryVerticalScrollRef,
                )
              }
            >
              {el2.name}
            </ThemeActiveButton1>
          )),
      )}
      {userStore.role == "ROLE_ADMIN" && (
        <>
          {searchParams.get("firstCategoryId") && (
            <ModalButton modal={<Blog2SecondCategoryModal />}>
              <div
                className={
                  "primary-border-radius flex aspect-square w-[2.4rem] items-center justify-center hover:bg-primary-20"
                }
              >
                <FontAwesomeIcon icon={faGear} />
              </div>
            </ModalButton>
          )}
        </>
      )}
    </div>
  );
};
export default Blog2SecondCategory;
