"use client";

import Button from "@component/common/button/hybrid/Button";
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
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    blog2Store.setBlog2CategoryList(props.categoryList);
    if (!searchParams.get("firstCategoryId")) {
      if (props.categoryList.length > 0) {
        handleFirstCategoryClick(props.categoryList[0].id);
      } 
    }
  }, []);

  return (
    <div
      className={
        "items-center flex gap-[.5rem] overflow-x-scroll overflow-hidden whitespace-nowrap scrollbar-hide rounded-[1rem] min-h-[3.5rem] "
      }
      ref={blogFirstCategoryVerticalScrollRef}
    >
      {blog2Store.categoryList?.map((el) => (
        <Button
          className={`px-4 py-2 h-[3rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 rounded-[1rem] ${
            el.id == blog2Store.activeBlog2FirstCategoryId &&
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
        >
          {el.name}
        </Button>
      ))}

      {userStore.role == "ROLE_ADMIN" && (
        <ModalButton
          modal={<Blog2FirstCategoryModal />}
        >
          <div
            className={
              "w-[2.4rem] aspect-square  flex items-center justify-center outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 rounded-[1rem]"
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