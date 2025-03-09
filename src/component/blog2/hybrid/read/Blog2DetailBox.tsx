"use client";

import Blog2BasicContentViewBox from "@component/blog2/view/Blog2BasicContentViewBox";
import Blog2ResultContentViewBox from "@component/blog2/view/Blog2ResultContentViewBox";
import Button from "@component/common/button/hybrid/Button";
import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import ConfirmModal from "@component/common/modal/hybrid/ConfirmModal";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLoading from "@hooks/useLoading";
import useModalState from "@hooks/useModalState";
import useBlog2Store from "@store/blog2Store";
import useToastifyStore from "@store/toastifyStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUserStore from "src/store/userStore";
import Blog2StructureContentViewBox from "./../../view/Blog2StructureContentViewBox";

interface IBlog2DetailBox {
  data: responseReadBlog2;
}
const Blog2DetailBox = (props: IBlog2DetailBox) => {
  const [menu, setMenu] = useState("");
  const router = useRouter();
  const userStore = useUserStore();
  const toastifyStore = useToastifyStore();
  const modalState = useModalState();
  const blog2Store = useBlog2Store();
  const { loading, startLoading, stopLoading } = useLoading();
  const deleteBlog2Handler = async () => {
    startLoading();
    // 삭제 API
    const response = await fetch(`/api/blog2?id=${props.data.blog2.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: "블로그 삭제에 실패",
      });
      stopLoading();
      return;
    }
    // 기존 리스트에서 블로그 항목 제거
    if (
      blog2Store.blog2List.blog2SecondCategoryId ==
      props.data.blog2SecondCategory.id
    ) {
      blog2Store.setBlog2List({
        id: blog2Store.blog2List.blog2SecondCategoryId,
        list: [
          ...blog2Store.blog2List.list.filter(
            (i) => i.id !== props.data.blog2.id,
          ),
        ],
      });
    }
    stopLoading();
    await router.push(
      `/blog2?firstCategoryId=${props.data.blog2.firstCategoryId}&secondCategoryId=${props.data.blog2SecondCategory.id}`,
    );
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
    {key: "기초", list: props.data.blog2BasicList},
    {key: "구조", list: props.data.blog2StructureList},
    {key: "결과", list: props.data.blog2ResultList},
  ];

  return (
    <section
      className={"mt-[.25rem] flex h-auto w-full flex-col gap-y-2 pb-[1rem]"}
    >
      <LoadingSpinner loading={loading} />
      <div className="grid w-full grid-cols-[2rem_calc(100%-7.5rem)_4.5rem] items-center gap-x-2">
        <Button
          className={
            "primary-border-radius aspect-square h-[2rem] bg-primary-20 default-flex"
          }
          onClick={() =>
            router.push(
              `/blog2?firstCategoryId=${props.data.blog2.firstCategoryId}&secondCategoryId=${props.data.blog2SecondCategory.id}`,
            )
          }
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <div
          className={
            "w-full break-words break-all rounded-[1rem] text-center font-SDSamliphopangche_Outline text-[1.5rem] font-bold"
          }
        >
          {props.data.blog2.title}
        </div>
        {userStore.role == "ROLE_ADMIN" && (
          <div className={"flex gap-x-2"}>
            <Button
              className={
                "primary-border-radius aspect-square h-[2rem] bg-primary-20 font-bold default-flex"
              }
              onClick={() => {
                startLoading();
                router.push(`/blog2/update/${props.data.blog2.id}`);
              }}
            >
              <Image
                alt=""
                src={"/images/icons/ic-edit-black.svg"}
                width={16}
                height={16}
              />
            </Button>
            <ModalButton
              buttonClassName={
                "aspect-square h-[2rem] bg-primary-20 font-bold primary-border-radius default-flex"
              }
              modal={
                <ConfirmModal
                  loading={loading}
                  onCancelClick={() => modalState.closeModal()}
                  onConfirmClick={() => {
                    startLoading();
                    deleteBlog2Handler();
                  }}
                  mainMessage={["블로그를 삭제하시겠습니까?"]}
                />
              }
            >
              <Image
                alt=""
                src={"/images/icons/ic-trash.svg"}
                width={16}
                height={16}
              />
            </ModalButton>
          </div>
        )}
      </div>
      <div
        className={
          "primary-border-radius flex min-h-[2.75rem] w-full flex-shrink-0 gap-x-2"
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
      <div className={"primary-border-radius flex h-auto w-full p-1"}>
        {menu == "기초" && (
          <Blog2BasicContentViewBox data={props.data.blog2BasicList} />
        )}
        {menu == "구조" && (
          <Blog2StructureContentViewBox data={props.data.blog2StructureList} />
        )}
        {menu == "결과" && (
          <Blog2ResultContentViewBox data={props.data.blog2ResultList} />
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
export default Blog2DetailBox;
