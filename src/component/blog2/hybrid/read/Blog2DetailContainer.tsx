"use client";

import Blog2BasicContentView from "@component/blog2/view/Blog2BasicContentView";
import Blog2ResultContentView from "@component/blog2/view/Blog2ResultContentView";
import BackButton from "@component/common/button/BackButton";
import DeleteConfirmButton from "@component/common/button/DeleteConfirmButton";
import EditButton from "@component/common/button/EditButton";
import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import useFetchCSR from "@hooks/useFetchCSR";
import useLoading from "@hooks/useLoading";
import useModalState from "@hooks/useModalState";
import useBlog2Store from "@store/blog2Store";
import useToastifyStore from "@store/toastifyStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUserStore from "src/store/userStore";
import Blog2StructureContentView from "../../view/Blog2StructureContentView";

interface IBlog2DetailContainer {
  data: responseReadBlog2;
}
const Blog2DetailContainer = (props: IBlog2DetailContainer) => {
  const [menu, setMenu] = useState("");
  const router = useRouter();
  const userStore = useUserStore();
  const toastifyStore = useToastifyStore();
  const modalState = useModalState();
  const blog2Store = useBlog2Store();
  const fetchCSR = useFetchCSR();
  const { loading, startLoading, stopLoading } = useLoading();
  const deleteBlog2Handler = async () => {
    // 삭제 API
    try {
      const result = await fetchCSR.requestWithHandler({
        url: `/api/blog2?id=${props.data.blog2.id}`,
        method: "DELETE",
      });
      if (result == undefined) return;
      // 기존 리스트에서 블로그 항목 제거
      if (
        blog2Store.blogItem.blog2SecondCategoryId ==
        props.data.blog2SecondCategory.id
      ) {
        blog2Store.setBlogItem({
          id: blog2Store.blogItem.blog2SecondCategoryId,
          list: [
            ...blog2Store.blogItem.list.filter(
              (i) => i.id !== props.data.blog2.id,
            ),
          ],
        });
      }
      await router.push(
        `/blog2?firstCategoryId=${props.data.blog2.firstCategoryId}&secondCategoryId=${props.data.blog2SecondCategory.id}`,
      );
    } catch {
      stopLoading();
    }
  };

  useEffect(() => {
    const preElements = document.querySelectorAll(".click-to-copy");

    preElements.forEach((pre) => {
      const button = pre.querySelector("button"); // 버튼 요소를 명확히 선택
      if (button) {
        button.addEventListener("click", (event) => {
          event.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 방지
          const code = pre.querySelector("code");
          if (code) {
            const textToCopy = code.textContent || "";
            navigator.clipboard
              .writeText(textToCopy)
              .then(() => {
                // alert("코드가 복사되었습니다!");
                toastifyStore.setToastify({
                  message: "코드가 복사되었습니다."
                });
              })
              .catch((err) => {
                console.error("복사 실패:", err);
              });
          }
        });
      }
    });

    return () => {
      preElements.forEach((pre) => {
        pre.removeEventListener("click", () => {});
      });
    };
  }, [menu]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    let isMenuInURL = params.get("menu") &&
      ["기초", "구조", "결과"].includes(params.get("menu") as string);
    let _menu = "";
    if (props.data.blog2ResultList.length > 0) {
      _menu = "결과";
    } else if (props.data.blog2StructureList.length > 0) {
      _menu = "구조";
    } else if (props.data.blog2BasicList.length > 0) {
      _menu = "기초";
    }
    setMenu(isMenuInURL ? params.get("menu")! : _menu);
      
    blog2Store.setBlog2ActiveFirstCategoryId(props.data.blog2.firstCategoryId);
    blog2Store.setBlog2ActiveSecondCategoryId(props.data.blog2SecondCategory.id);
    if (params.get("timestamp")) {
      params.delete("timestamp");
      url.search = params.toString();
    }
    if (!isMenuInURL && _menu !== "") {
      params.set("menu", _menu);
      url.search = params.toString();
    }
    window.history.replaceState({}, "", url.toString());
  }, []);

  const menuItems = [
    {key: "기초", list: props.data?.blog2BasicList},
    {key: "구조", list: props.data?.blog2StructureList},
    {key: "결과", list: props.data?.blog2ResultList},
  ];

  if (userStore.id == 0) {
    return (
      <section
        className={
          "mt-[.25rem] flex h-[calc(100vh-80px)] w-full flex-col gap-y-2 pb-[1rem] default-flex"
        }
      >
        로딩중...
      </section>
    );
  }

  return (
    <section
      className={"mt-[.25rem] flex h-auto w-full flex-col gap-y-2 pb-[1rem]"}
    >
      <LoadingSpinner loading={loading} />
      <div className="grid w-full grid-cols-[2rem_calc(100%-7.5rem)_4.5rem] items-center gap-x-2">
        {/* <ThemeButton1
          className={"aspect-square h-[2rem] default-flex"}
          onClick={() =>
            router.push(
              `/blog2?firstCategoryId=${props.data.blog2.firstCategoryId}&secondCategoryId=${props.data.blog2SecondCategory.id}`,
            )
          }
        >
          <FaArrowLeft />
        </ThemeButton1> */}
        <BackButton className="aspect-square h-[2rem] default-flex" />
        <div
          className={
            "w-full break-words break-all rounded-[1rem] text-center font-SDSamliphopangche_Outline text-[1.5rem] font-bold"
          }
        >
          {props.data.blog2.title}
        </div>
        {userStore.role == "ROLE_ADMIN" && (
          <div className={"flex gap-x-2"}>
            <EditButton
              onClick={() => {
                startLoading();
                router.push(`/blog2/update/${props.data.blog2.id}`);
              }}
              className="h-[2rem]"
              size={"24"}
              aria-label="블로그 수정하기 버튼"
            />
            <DeleteConfirmButton
              className="h-[2rem]"
              ariaLabel="게시판 삭제 버튼"
              size={"24"}
              onCancelClick={() => {
                modalState.closeModal();
              }}
              onConfirmClick={() => {
                startLoading();
                deleteBlog2Handler();
              }}
              mainMessage={["블로그를 삭제하시겠습니까?"]}
              loading={loading}
            />
          </div>
        )}
      </div>
      <div
        className={
          "flex min-h-[2.75rem] w-full flex-shrink-0 gap-x-2 primary-border-radius"
        }
      >
        {menuItems.map(({key, list}) =>
          list.length > 0 ? (
            <ThemeActiveButton1
              key={key}
              isActive={menu === key}
              onClick={() => {
                setMenu(key);
              }}
              className="h-auto w-full animate-rotateFadeIn"
            >
              {key}
              <span className="pl-1">{list.length}</span>
            </ThemeActiveButton1>
          ) : null,
        )}
        {menu == "" && (
          <div
            className={
              "h-auto w-full rounded-l-[1rem] rounded-r-[1rem] default-flex"
            }
          >
            아무런 내용이 없습니다.
          </div>
        )}
      </div>
      <div className={"flex h-auto w-full p-1 primary-border-radius"}>
        {menu == "기초" && (
          <Blog2BasicContentView data={props.data.blog2BasicList} />
        )}
        {menu == "구조" && (
          <Blog2StructureContentView data={props.data.blog2StructureList} />
        )}
        {menu == "결과" && (
          <Blog2ResultContentView data={props.data.blog2ResultList} />
        )}
        {menu == "" && (
          <div className="w-full default-flex">
            <LottieNotFound text={"아무런 내용이 없습니다."} />
          </div>
        )}
      </div>
    </section>
  );
};
export default Blog2DetailContainer;
