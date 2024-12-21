"use client";

import Blog2BasicContentViewBox from "@component/blog2/view/Blog2BasicContentViewBox";
import Blog2ResultContentViewBox from "@component/blog2/view/Blog2ResultContentViewBox";
import Button from "@component/common/button/hybrid/Button";
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
  const [menu, setMenu] = useState(
    props.data.blog2ResultList.length > 0
      ? "결과"
      : props.data.blog2StructureList.length > 0
        ? "구조"
        : props.data.blog2BasicList.length > 0
          ? "기초"
          : "",
  );
  const router = useRouter();
  const userStore = useUserStore();
  const toastifyStore = useToastifyStore();
  const modalState = useModalState();
  const blog2Store = useBlog2Store();
  const {loading, startLoading, stopLoading} = useLoading();
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
    blog2Store.setBlog2ActiveFirstCategoryId(props.data.blog2.firstCategoryId);
    blog2Store.setBlog2ActiveSecondCategoryId(props.data.blog2SecondCategory.id);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (params.get("timestamp")) {
      params.delete("timestamp");
      url.search = params.toString();
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  return (
    <section
      className={"mt-[.25rem] flex h-auto w-full flex-col gap-y-2 pb-[1rem]"}
    >
      <LoadingSpinner loading={loading} />
      <div className="grid w-full grid-cols-[2rem_calc(100%-7.5rem)_4.5rem] items-center gap-x-2">
        <Button
          className={
            "aspect-square h-[2rem] bg-primary-20 default-outline default-flex"
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
                "aspect-square h-[2rem] bg-primary-20 font-bold default-outline default-flex"
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
                "aspect-square h-[2rem] bg-primary-20 font-bold default-outline default-flex"
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
          "flex min-h-[2.75rem] w-full flex-shrink-0 gap-x-2 default-outline"
        }
      >
        {props.data.blog2BasicList.length > 0 && (
          <Button
            onClick={() => setMenu("기초")}
            className={`h-auto w-full rounded-2xl ${menu == "기초" && "bg-primary-60 animate-rotateFadeIn"}`}
          >
            기초
            <span className="pl-1 text-black-40">
              {props.data.blog2BasicList.length || 0}
            </span>
          </Button>
        )}
        {props.data.blog2StructureList.length > 0 && (
          <Button
            onClick={() => setMenu("구조")}
            className={`h-auto w-full rounded-2xl ${menu == "구조" && "bg-primary-60 animate-rotateFadeIn"}`}
          >
            구조
            <span className="pl-1 text-black-40">
              {props.data.blog2StructureList.length || 0}
            </span>
          </Button>
        )}
        {props.data.blog2ResultList.length > 0 && (
          <Button
            onClick={() => setMenu("결과")}
            className={`h-auto w-full rounded-2xl ${menu == "결과" && "bg-primary-60 animate-rotateFadeIn"}`}
          >
            결과
            <span className="pl-1 text-black-40">
              {props.data.blog2ResultList.length || 0}
            </span>
          </Button>
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
      <div className={"flex h-auto w-full p-1 default-outline"}>
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
