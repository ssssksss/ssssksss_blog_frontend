import AbsoluteCloseButton from "@component/common/button/hybrid/AbsoluteCloseButton";
import Button from "@component/common/button/hybrid/Button";
import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ThemeButton1 from "@component/common/button/ThemeButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDragAndDropBlob } from "@hooks/useDragAndDropBlob";
import useLoadingHandler from "@hooks/useLoadingHandler";
import useModalState from "@hooks/useModalState";
import useOutsideClick from "@hooks/useOutsideClick";
import usePreventBodyScroll from "@hooks/usePreventBodyScroll";
import { AWSS3Prefix } from "@utils/variables/s3url";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import useBlog2Store from "src/store/blog2Store";
import useLoading from "../../../../hooks/useLoading";

interface IBlog2CreateUpdateHeader {
  isEdit: boolean;
}
const Blog2CreateUpdateHeader = (props: IBlog2CreateUpdateHeader) => {
  const modalState = useModalState();
  const modalState1 = useModalState();
  const modalState2 = useModalState();
  const ref = useRef<any>();
  const blog2Store = useBlog2Store();
  const formContext = useFormContext();
  const [title, setTitle] = useState(formContext.getValues("title") || "");
  const { loadingWithHandler } = useLoadingHandler();
  const [description, setDescription] = useState(
    formContext.getValues("description") || "",
  );
  const [imageUrl, setImageUrl] = useState<string>(
    formContext.getValues("thumbnailImageUrl")
      ? AWSS3Prefix + "" + formContext.getValues("thumbnailImageUrl")
      : "",
  );
  const router = useRouter();
  const {loading, startLoading, stopLoading} = useLoading();
  const [blog2Status, setBlog2Status] = useState(
    formContext.getValues("blog2Status"),
  );
  const [firstCategory, setFirstCategory] = useState({
    id: formContext.getValues("firstCategoryId") || 0,
    name: formContext.getValues("firstCategoryName") || "",
  });
  const [secondCategory, setSecondCategory] = useState({
    id: formContext.getValues("secondCategoryId") || 0,
    name: formContext.getValues("secondCategoryName") || "",
  });
  const fakeImageUpload = ({file, url}: {file: File; url: string}) => {
    setImageUrl(url);
    formContext.setValue("thumbnailImageFile", file, {shouldValidate: true});
  };

  const {isDragging, onDragEnter, onDragLeave, onDragOver, onDropOrInputEvent} =
    useDragAndDropBlob({fakeImageUpload});
  usePreventBodyScroll(modalState.isOpen);

  // 최종적으로 블로그 저장하는 API 핸들러
  const blog2CreateUpdateSubmitHandler = async () => {
    const formData = new FormData();
    formData.append("blog2Status", formContext.getValues("blog2Status"));
    if (!props.isEdit || formContext.getValues("isUpdateBlog2Header")) {
      formData.append("title", formContext.getValues("title"));
      formData.append("description", formContext.getValues("description"));
      formData.append(
        "firstCategoryId",
        formContext.getValues("firstCategoryId"),
      );
      formData.append(
        "secondCategoryId",
        formContext.getValues("secondCategoryId"),
      );
    }

    // ? [1] 기초 내용
    if (!props.isEdit || formContext.getValues("isUpdateBlog2Basic")) {
      // 불필요한 데이터는 요청을 보내지 않는다. 그래서 id 값만을 보낸다.
      const _blog2BasicList = formContext
        .getValues("blog2BasicList")
        .map((i: IBlog2Basic) => {
          return {
            id: i.id,
            position: i.position,
            blog2BasicContent: {
              id: i.blog2BasicContent.id,
            },
          };
        });
      if (_blog2BasicList.length > 0) {
        formData.append("blog2BasicList", JSON.stringify(_blog2BasicList));
      }
      // ? 기초 목록 삭제
      if (props.isEdit) {
        const deleteBlog2BasicList = formContext.getValues(
          "deleteBlog2BasicList",
        );
        deleteBlog2BasicList.forEach((item: number) => {
          formData.append("deleteBlog2BasicList", item + "");
        });
      }
    }
    // ? [2] 구조
    if (!props.isEdit || formContext.getValues("isUpdateBlog2Structure")) {
      const _blog2StructureList = formContext
        .getValues("blog2StructureList")
        .map((i: IBlog2Structure) => {
          return {
            id: i.id,
            position: i.position,
            blog2StructureContent: {
              id: i.blog2StructureContent.id,
            },
          };
        });
      if (_blog2StructureList.length > 0) {
        formData.append(
          "blog2StructureList",
          JSON.stringify(_blog2StructureList),
        );
      }
      // ? 구조 글 삭제
      if (props.isEdit) {
        const deleteBlog2StructureList = formContext.getValues(
          "deleteBlog2StructureList",
        );
        deleteBlog2StructureList.forEach((item: number) => {
          formData.append("deleteBlog2StructureList", item + "");
        });
      }
    }
    // ? [3] 결과

    if (!props.isEdit || formContext.getValues("isUpdateBlog2Result")) {
      const _blog2ResultList = formContext.getValues("blog2ResultList");
      if (_blog2ResultList.length > 0) {
        formData.append(
          "blog2ResultList",
          JSON.stringify(formContext.getValues("blog2ResultList")),
        );
      }
      // ? 결과 목록 삭제
      if (props.isEdit) {
        const deleteBlog2ResultList = formContext.getValues(
          "deleteBlog2ResultList",
        );
        if (deleteBlog2ResultList.length > 0) {
          formData.append("deleteBlog2ResultList", deleteBlog2ResultList);
        }
      }
    }

    // * 블로그 생성 API
    if (!props.isEdit) {
      const response = await fetch("/api/blog2", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        return {
          type: "error",
          message: "블로그 생성에 실패",
        };
      }
      const result: resBlog2Create = await response.json();
      if (
        blog2Store.blog2List.blog2SecondCategoryId ==
        formContext.getValues("secondCategoryId")
      ) {
        blog2Store.setBlog2List({
          id: blog2Store.blog2List.blog2SecondCategoryId,
          list: [result.data, ...blog2Store.blog2List.list],
        });
      }
      router.replace(
        `/blog2?firstCategoryId=${formContext.getValues("firstCategoryId")}&secondCategoryId=${formContext.getValues("secondCategoryId")}`,
      );
    }

    // * 블로그 수정 API
    if (props.isEdit) {
      formData.append("id", formContext.getValues("id"));
      const response = await fetch(
        `/api/blog2?id=${formContext.getValues("id")}`,
        {
          method: "PUT",
          body: formData,
        },
      );
      if (!response.ok) {
        return {
          type: "error",
          message: "블로그 수정 실패",
        };
      }
      if (response.ok) {
        router.replace(
          `/blog2/${formContext.getValues("id")}?timestamp=${new Date()}`,
        );
      }
    }
  };

  // 첫번째 카테고리 클릭시 자동으로 2번째 카테고리 선택되게 하는 함수
  const handleFirstCategory = ({id, name}: {id: number; name: string}) => {
    setFirstCategory({
      id,
      name,
    });
    blog2Store.categoryList.map((i) => {
      if (i.id == id) {
        if (i.blog2SecondCategoryList!.length > 0) {
          setSecondCategory({
            id: i.blog2SecondCategoryList![0].id,
            name: i.blog2SecondCategoryList![0].name,
          });
          setImageUrl(
            AWSS3Prefix + i.blog2SecondCategoryList![0].thumbnailImageUrl,
          );
        } else {
          setSecondCategory({
            id: 0,
            name: "",
          });
          setImageUrl("");
        }
      }
    });
    modalState1.closeModal();
  };

  const handleSecondCategoryClick = ({
    id,
    name,
  }: {
    id: number;
    name: string;
  }) => {
    setSecondCategory({
      id,
      name,
    });
    blog2Store.categoryList
      .filter((i) => i.id == firstCategory.id)[0]
      .blog2SecondCategoryList?.map((j) => {
        if (j.id == id) {
          setImageUrl(AWSS3Prefix + j.thumbnailImageUrl);
        }
      });
    modalState2.closeModal();
  };

  // 블로그 헤더에서 제목, 설명, 카테고리 1,2, 썸네일 이미지 등을 정하는 함수
  const handleSaveClick = () => {
    formContext.setValue("firstCategoryId", firstCategory.id);
    formContext.setValue("firstCategoryName", firstCategory.name);
    formContext.setValue("secondCategoryId", secondCategory.id);
    formContext.setValue("secondCategoryName", secondCategory.name);
    formContext.setValue("title", title);
    formContext.setValue("description", description);
    formContext.setValue("isUpdateBlog2Header", true);
    modalState.closeModal();
  };

  const handleBlog2Status = (status: string) => {
    formContext.setValue("blog2Status", status);
    formContext.setValue("isUpdateBlog2Header", true);
    setBlog2Status(status);
  };

  useOutsideClick(ref, () => {
    if (modalState1.isOpen) {
      modalState1.closeModal();
      return;
    }
    if (modalState2.isOpen) {
      modalState2.closeModal();
      return;
    }
    modalState.closeModal();
  });

  return (
    <>
      <LoadingSpinner loading={loading} />
      <div className="mb-2 flex w-full justify-between">
        <div className="grid w-full grid-cols-[2.75rem_calc(100%-5.5em)_2.75rem] items-center">
          <Button
            className={
              "primary-border-radius aspect-square h-[2.75rem] min-h-[2.75rem] bg-primary-20 p-2 default-flex"
            }
            onClick={() => router.back()}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{width: "24px", height: "24px"}}
            />
          </Button>
          <div
            className={
              "w-full break-words break-all rounded-[1rem] p-2 text-center font-SDSamliphopangche_Outline text-[1.5rem] font-bold"
            }
          >
            {formContext.getValues("title")}
          </div>
          <Button
            className={
              "primary-border-radius aspect-square h-[2.75rem] min-h-[2.75rem] bg-primary-20 p-2 font-bold default-flex"
            }
            onClick={() =>
              loadingWithHandler(() => blog2CreateUpdateSubmitHandler())
            }
          >
            <SendHorizontal />
          </Button>
        </div>
      </div>
      <Button
        className={"primary-border-radius w-full p-2 hover:bg-primary-20"}
        onClick={() => modalState.openModal()}
      >
        {formContext.getValues("title") ? (
          <div className="gap-x-1 break-keep default-flex">
            <span className={"font-bold text-primary-100"}>
              {formContext.getValues("title")}
            </span>
            <span className={"font-bold"}> - </span>
            <span className={"font-bold text-secondary-100"}>
              {formContext.getValues("firstCategoryName")}
            </span>
            <span className={"font-bold"}> - </span>
            <span className={"font-bold text-third-100"}>
              {formContext.getValues("secondCategoryName")}
            </span>
          </div>
        ) : (
          "블로그 카테고리, 제목, 내용"
        )}
      </Button>
      {/* 블로그의 제목, 설명, 카테고리 등을 선택하는 모달화면 */}
      {/* TODO : 이거 모달 컴포넌트로 처리 안되나?? */}
      {modalState.isOpen && (
        <div
          className={
            "fixed left-0 top-0 z-[70] h-full w-full bg-black-100/30 default-flex"
          }
        >
          <div
            ref={ref}
            className="relative grid h-[calc(100%-2rem)] max-h-[46rem] w-full max-w-[37.5rem] grid-rows-[3rem_3rem_3rem_3rem_18rem] gap-y-2 overflow-y-scroll rounded-[1rem] bg-default-1 px-[2.25rem] pb-[1.75rem] pt-[5rem] scrollbar-hide"
          >
            <ThemeInput1
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={"flex items-center p-2 text-[1.5rem] font-bold"}
              placeholder={"제목"}
            />
            <ThemeInput1
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={"flex items-center p-2 text-[1.25rem]"}
              placeholder={"설명"}
            />
            <ThemeActiveButton1
              isActive={firstCategory.name}
              onClick={() => modalState1.openModal()}
              className={"flex items-center p-2"}
            >
              {firstCategory.name || "1번째 카테고리"}
            </ThemeActiveButton1>
            <ThemeActiveButton1
              isActive={secondCategory.name}
              onClick={() => modalState2.openModal()}
              disabled={firstCategory.id < 1}
              className={"flex items-center p-2"}
            >
              {secondCategory.name || "2번째 카테고리"}
            </ThemeActiveButton1>
            <label
              className={
                "primary-border-radius relative h-[16rem] w-full cursor-pointer"
              }
              htmlFor={"imageUpload"}
              // onDragEnter={onDragEnter}
              // onDragLeave={onDragLeave}
              // onDragOver={onDragOver}
              // onDrop={onDropOrInputEvent}
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={"image"}
                  layout="fill"
                  className="rounded-[1rem] p-2"
                />
              )}
              {/* <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onDropOrInputEvent}
              /> */}
            </label>
            <div className="primary-border-radius flex h-[3rem]">
              <ThemeActiveButton1
                isActive={blog2Status == "PUBLIC"}
                className={`h-full w-full rounded-none rounded-l-2xl`}
                onClick={() => handleBlog2Status("PUBLIC")}
              >
                PUBLIC
              </ThemeActiveButton1>
              <ThemeActiveButton1
                isActive={blog2Status == "HIDE"}
                className={`h-full w-full rounded-none`}
                onClick={() => handleBlog2Status("HIDE")}
              >
                HIDE
              </ThemeActiveButton1>
              <ThemeActiveButton1
                isActive={blog2Status == "DEVELOP"}
                className={`h-full w-full rounded-none rounded-r-2xl`}
                onClick={() => handleBlog2Status("DEVELOP")}
              >
                DEVELOP
              </ThemeActiveButton1>
            </div>
            <ThemeButton1
              className={
                "h-[3rem] w-full p-2"
              }
              onClick={() => loadingWithHandler(() => handleSaveClick())}
              disabled={
                !(title && description && firstCategory.id && secondCategory.id)
              }
            >
              저장
            </ThemeButton1>
            {!modalState1.isOpen && !modalState2.isOpen && (
              <AbsoluteCloseButton onClick={() => modalState.closeModal()} />
            )}
            {/* 1번째 카테고리 모달 화면 */}
            {modalState1.isOpen && (
              <div className="fixed left-[50%] top-[50%] flex h-fit w-full max-w-[37.5rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-y-2 rounded-[1rem]">
                <ModalTemplate className="flex h-full flex-col gap-y-4">
                  <div
                    className={
                      "flex h-full w-full flex-wrap gap-2 rounded-[1rem] p-8"
                    }
                  >
                    {blog2Store.categoryList.map((i) => (
                      <Button
                        onClick={() =>
                          handleFirstCategory({
                            id: i.id,
                            name: i.name,
                          })
                        }
                        key={i.id}
                        className={`primary-border-radius h-[3rem] min-w-[3rem] bg-primary-20 p-2 ${firstCategory.id == i.id && "bg-primary-20"}`}
                      >
                        {i.name}
                      </Button>
                    ))}
                  </div>
                  <AbsoluteCloseButton
                    onClick={() => modalState1.closeModal()}
                  />
                </ModalTemplate>
              </div>
            )}
            {/* 2번째 카테고리 모달 화면 */}
            {modalState2.isOpen && (
              <div className="fixed left-[50%] top-[50%] flex h-fit w-full max-w-[37.5rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-y-2 rounded-[1rem]">
                <ModalTemplate className="h-full default-flex">
                  <div
                    className={
                      "flex h-full w-full flex-wrap gap-2 rounded-[1rem] p-8"
                    }
                  >
                    {firstCategory.id > 0 &&
                      blog2Store.categoryList
                        .filter((i) => i.id == firstCategory.id)[0]
                        .blog2SecondCategoryList?.map((j) => (
                          <Button
                            onClick={() =>
                              handleSecondCategoryClick({
                                id: j.id,
                                name: j.name,
                              })
                            }
                            key={j.id}
                            className={`primary-border-radius h-[3rem] min-w-[3rem] bg-primary-20 p-2 ${secondCategory.id == j.id && "bg-primary-20"}`}
                          >
                            {j.name}
                          </Button>
                        ))}
                  </div>
                  <AbsoluteCloseButton
                    onClick={() => modalState2.closeModal()}
                  />
                </ModalTemplate>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Blog2CreateUpdateHeader;
