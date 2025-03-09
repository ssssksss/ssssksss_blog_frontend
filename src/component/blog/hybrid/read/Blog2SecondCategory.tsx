"use client";

import Blog2SecondCategoryModal from "@component/blog2/hybrid/read/Blog2SecondCategoryModal";
import Button from "@component/common/button/hybrid/Button";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import useBlog2Store from "src/store/blog2Store";
import useUserStore from "src/store/userStore";

const Blog2SecondCategory = (props: {categoryList: IBlog2FirstCategory[]}) => {
  const blogSecondCategoryVerticalScrollRef = useRef<HTMLDivElement>(null);
  const userStore = useUserStore();
  const blog2Store = useBlog2Store();
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
    blog2Store.setBlog2CategoryList(props.categoryList);
    if (!searchParams.get("firstCategoryId")) {
      if (props.categoryList.length > 0) {
        if (props.categoryList[0].blog2SecondCategoryList!.length > 0) {
          handleSecondCategoryClick(
            props.categoryList[0].blog2SecondCategoryList![0].id,
          );
        }
      }
    }
  }, []);

  return (
    <div
      className={
        "mt-[.5rem] flex min-h-[4rem] items-center gap-[.5rem] overflow-hidden overflow-x-scroll whitespace-nowrap rounded-[1rem] p-[.5rem] outline-primary-20 scrollbar-hide"
      }
      ref={blogSecondCategoryVerticalScrollRef}
    >
      {/* {props.blogCategoryList?.length == 0 &&
        Array.from({ length: 10 }, (index) => index).map((_, index) => (
          <Skeleton key={index} />
        ))} */}
      {blog2Store.categoryList.map(
        (el) =>
          el.id == Number(searchParams.get("firstCategoryId")) &&
          el.blog2SecondCategoryList?.map((el2) => (
            <Button
              className={`h-[3rem] rounded-[1rem] px-4 py-2 outline-primary-20 ${
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
      {userStore.role == "ROLE_ADMIN" && (
        <>
          {searchParams.get("firstCategoryId") && (
            <ModalButton modal={<Blog2SecondCategoryModal />}>
              <div className="flex aspect-square w-[2.4rem] items-center justify-center rounded-[1rem] outline-primary-20">
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
