"use client";

import Button from "@component/common/button/hybrid/Button";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import useBlogStore from "src/store/blogStore";
import useUserStore from "src/store/userStore";


const BlogFirstCategory = (props: {categoryList: IBlogFirstCategory[]}) => {
  const blogFirstCategoryVerticalScrollRef = useRef<HTMLDivElement>(null);
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

  const handleFirstCategoryClick = (id: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("firstCategoryId", id + "");
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    blogStore.setBlogCategoryList(props.categoryList);
    if (!searchParams.get("firstCategoryId")) {
      if (props.categoryList.length > 0) {
        handleFirstCategoryClick(props.categoryList[0].id);
      } 
    }
  }, []);

  return (
    <div
      className={
        "items-center flex gap-[.5rem] overflow-x-scroll p-[.5rem] overflow-hidden whitespace-nowrap scrollbar-hide rounded-[1rem] min-h-[4rem] "
      }
      ref={blogFirstCategoryVerticalScrollRef}
    >
      {/* {props.blogCategoryList?.length == 0 &&
        Array.from({ length: 10 }, (index) => index).map((_, index) => (
          <Skeleton key={index} />
        ))} */}
      {blogStore.categoryList?.map((el) => (
        <Button
          className={`px-4 py-2 h-[3rem] outline-primary-20 rounded-[1rem] ${
            el.id == (searchParams.get("firstCategoryId") || 0) &&
            "bg-primary-20"
          }`}
          key={el.id}
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            onClickAdjustHorizontalScroll(
              e,
              () => handleFirstCategoryClick(el.id),
              blogFirstCategoryVerticalScrollRef,
            )
          }
          // badgeValue={el.blog2SecondCategoryList?.reduce(
          //   (sum, el) => sum + el.blogCount,
          //   0,
          // )}
        >
          {el.name}
        </Button>
      ))}

      {/* {userStore.role == "ROLE_ADMIN" && (
        <ModalButton
          modal={<BlogFirstCategoryModal />}
        >
          <div
            className={
              "w-[2.4rem] aspect-square  flex items-center justify-center outline-primary-20 rounded-[1rem]"
            }
          >
            <FontAwesomeIcon icon={faGear} />
          </div>
        </ModalButton>
      )} */}
    </div>
  );
};
export default BlogFirstCategory;