"use client";

import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import useBlog2Store from "src/store/blog2Store";
import useUserStore from "src/store/userStore";
import Blog2FirstCategoryModal from "./Blog2FirstCategoryModal";


const Blog2FirstCategory = (props: {categoryList: IBlog2FirstCategory[]}) => {
  const blogFirstCategoryVerticalScrollRef = useRef<HTMLDivElement>(null);
  const userStore = useUserStore();
  const blog2Store = useBlog2Store();
  const searchParams = useSearchParams();

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

  // 첫번째 카테고리 클릭시 2번째 카테고리 목록을 불러온다.
  const handleFirstCategoryClick = (id: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("firstCategoryId", id + "");
    blog2Store.setBlog2ActiveFirstCategoryId(id);
    blog2Store.categoryList.map(i => {
      if (i.id == id) {
        if (i.blog2SecondCategoryList!.length > 0) {
          params.set("secondCategoryId", i.blog2SecondCategoryList![0].id + "");
          blog2Store.setBlog2ActiveSecondCategoryId(i.blog2SecondCategoryList![0].id);
        } else {
          params.delete("secondCategoryId");
        }
      }
    });
    if (!params.get("secondCategoryId")) {
      blog2Store.setBlogItem({
        id: 0,
        list: [],
      });
    }
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    blog2Store.setBlog2CategoryList(props.categoryList);
    if (!searchParams.get("firstCategoryId")) {
      if (props.categoryList.length > 0) {
        handleFirstCategoryClick(props.categoryList[0].id);
      } 
    }else if (searchParams.get("firstCategoryId")) {
      if (props.categoryList.length > 0) {
        handleFirstCategoryClick(Number(searchParams.get("firstCategoryId")));
      } 
    }
  }, []);

  return (
    <div
      className={
        "flex min-h-[3.5rem] items-center gap-[.5rem] overflow-hidden overflow-x-scroll whitespace-nowrap scrollbar-hide"
      }
      ref={blogFirstCategoryVerticalScrollRef}
    >
      {blog2Store.categoryList?.map((el) => (
        <ThemeActiveButton1
          className={"h-[3rem] px-4 py-2"}
          isActive={el.id == blog2Store.activeBlog2FirstCategoryId}
          key={el.id}
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            onClickAdjustHorizontalScroll(
              e,
              () => handleFirstCategoryClick(el.id),
              blogFirstCategoryVerticalScrollRef,
            )
          }
        >
          {el.name}
        </ThemeActiveButton1>
      ))}

      {userStore.role == "ROLE_ADMIN" && (
        <ModalButton modal={<Blog2FirstCategoryModal />}>
          <div
            className={
              "primary-border-radius flex aspect-square w-[2.4rem] items-center justify-center hover:bg-primary-20"
            }
          >
            <FontAwesomeIcon icon={faGear} />
          </div>
        </ModalButton>
      )}
    </div>
  );
};
export default Blog2FirstCategory;