"use client";

import Button from "@component/common/button/hybrid/Button";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import useBlogStore from "src/store/blogStore";
import useUserStore from "src/store/userStore";

const BlogSecondCategory = (props: {categoryList: IBlogFirstCategory[]}) => {
  const blogSecondCategoryVerticalScrollRef = useRef<HTMLDivElement>(null);
  const userStore = useUserStore();
  const blogStore = useBlogStore();
  const searchParams = useSearchParams();


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

  const handleSecondCategoryClick = (id: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("secondCategoryId", id + "");
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    blogStore.setBlogCategoryList(props.categoryList);
    if (!searchParams.get("firstCategoryId")) {
      if (props.categoryList.length > 0) {
        if (props.categoryList[0].blogSecondCategoryList!.length > 0) {
          handleSecondCategoryClick(props.categoryList[0].blogSecondCategoryList![0].id);
        }
      } 
    }
  }, []);


  return (
    <div
      className={
        "mt-[.5rem] items-center flex gap-[.5rem] overflow-x-scroll p-[.5rem] overflow-hidden whitespace-nowrap scrollbar-hide min-h-[4rem] outline-primary-20 rounded-[1rem]"
      }
      ref={blogSecondCategoryVerticalScrollRef}
    >
      {/* {props.blogCategoryList?.length == 0 &&
        Array.from({ length: 10 }, (index) => index).map((_, index) => (
          <Skeleton key={index} />
        ))} */}
      {blogStore.categoryList.map(
        (el) =>
          el.id == Number(searchParams.get("firstCategoryId")) &&
          el.blogSecondCategoryList?.map((el2) => (
            <Button
              className={`px-4 py-2 h-[3rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 rounded-[1rem] ${
                el2.id == (searchParams.get("secondCategoryId") || 0) &&
            "bg-primary-20"
              }`}
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
            </Button>
          )),
      )}

      {/* {userStore.role == "ROLE_ADMIN" && searchParams.get("firstCategoryId") && (
        <ModalButton
          modal={<BlogSecondCategoryModal />}
        >
          <div
            className={
              "w-[2.4rem] aspect-square  flex items-center justify-center outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 rounded-[1rem]"
            }
          >
            <FontAwesomeIcon icon={faGear} />
          </div>
        </ModalButton>
      )} */}
    </div>
  );
};
export default BlogSecondCategory;