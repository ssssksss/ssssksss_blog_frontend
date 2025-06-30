import CreateButtonGroupWithTitle from "@component/common/button/CreateButtonGroupWithTitle";
import AbsoluteCloseButton from "@component/common/button/hybrid/AbsoluteCloseButton";
import Button from "@component/common/button/hybrid/Button";
import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ThemeButton1 from "@component/common/button/ThemeButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { useDragAndDropBlob } from "@hooks/useDragAndDropBlob";
import useFetchCSR from "@hooks/useFetchCSR";
import useModalState from "@hooks/useModalState";
import useOutsideClick from "@hooks/useOutsideClick";
import usePreventBodyScroll from "@hooks/usePreventBodyScroll";
import { AWSS3Prefix } from "@utils/variables/s3url";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import useBlog2Store from "src/store/blog2Store";

interface IBlog2CreateUpdateHeader {
  isEdit: boolean;
}
const Blog2CreateUpdateHeader = (props: IBlog2CreateUpdateHeader) => {
  const modalState = useModalState();
  const modalState1 = useModalState();
  const modalState2 = useModalState();
  const ref = useRef<any>();
  const formContext = useFormContext();
  const [title, setTitle] = useState(formContext.getValues("title") || "");
  const fetchCSR = useFetchCSR();
  const [description, setDescription] = useState(
    formContext.getValues("description") || "",
  );
  const blogCategoryList = useBlog2Store((state) => state.categoryList);
  const blogItemList = useBlog2Store((state) => state.blogItemList);
  const setBlogItemList = useBlog2Store((state) => state.setBlogItemList);
  const [imageUrl, setImageUrl] = useState<string>(
    formContext.getValues("thumbnailImageUrl")
      ? AWSS3Prefix + "" + formContext.getValues("thumbnailImageUrl")
      : "",
  );
  const router = useRouter();
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

    // ✅ [1] reqCreateBlog2 객체 생성
    const reqCreateBlog2 = {
      title: formContext.getValues("title"),
      description: formContext.getValues("description"),
      firstCategoryId: formContext.getValues("firstCategoryId"),
      secondCategoryId: formContext.getValues("secondCategoryId"),
      blog2Status: formContext.getValues("blog2Status"),
      blog2BasicList: JSON.stringify(
        formContext.getValues("blog2BasicList").map((i: IBlog2Basic) => ({
          id: i.id,
          position: i.position,
          blog2BasicContent: {
            id: i.blog2BasicContent.id,
          },
        })),
      ),
      blog2StructureList: JSON.stringify(
        formContext
          .getValues("blog2StructureList")
          .map((i: IBlog2Structure) => ({
            id: i.id,
            position: i.position,
            blog2StructureContent: {
              id: i.blog2StructureContent.id,
            },
          })),
      ),
      blog2ResultList: JSON.stringify(formContext.getValues("blog2ResultList")),
    };

    // ✅ [2] FormData에 JSON 데이터 추가
    formData.append(
      "reqCreateBlog2",
      new Blob([JSON.stringify(reqCreateBlog2)], {type: "application/json"}),
    );

    // ✅ [3] 삭제 목록 추가 (수정 시에만)
    if (props.isEdit) {
      formContext.getValues("deleteBlog2BasicList").forEach((id: number) => {
        formData.append("deleteBlog2BasicList", id.toString());
      });

      formContext
        .getValues("deleteBlog2StructureList")
        .forEach((id: number) => {
          formData.append("deleteBlog2StructureList", id.toString());
        });

      formData.append("id", formContext.getValues("id"));
    }

    // ✅ [5] 서버 요청 전송
    if (!props.isEdit) {
      // 생성
      const result = await fetchCSR.requestWithHandler({
        url: "/api/blog2",
        method: "POST",
        formData,
        showSuccessToast: true,
      });

      if (!result) return;

      // 현재 
      if (
        blogItemList.blog2SecondCategoryId ===
        formContext.getValues("secondCategoryId")
      ) {
        setBlogItemList({
          id: blogItemList.blog2SecondCategoryId,
          list: [result, ...blogItemList.list],
        });
      }

      router.replace(
        `/blog2?firstCategoryId=${formContext.getValues("firstCategoryId")}&secondCategoryId=${formContext.getValues("secondCategoryId")}`,
      );
    } else {
      // 수정
      const blog2Id = formContext.getValues("id");
      const result = await fetchCSR.requestWithHandler({
        url: `/api/blog2?id=${blog2Id}`,
        method: "PUT",
        formData,
        showSuccessToast: true,
      });

      if (!result) return;

      router.replace(`/blog2/${formContext.getValues("id")}`);
    }
  };
  

  // 첫번째 카테고리 클릭시 자동으로 2번째 카테고리 선택되게 하는 함수
  const handleFirstCategory = ({id, name}: {id: number; name: string}) => {
    setFirstCategory({
      id,
      name,
    });
    blogCategoryList.map((i) => {
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
    blogCategoryList
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
      <div className="mb-2 flex w-full justify-between">
        <CreateButtonGroupWithTitle
          title={formContext.getValues("title")}
          submitHandler={() => blog2CreateUpdateSubmitHandler()}
        />
      </div>
      <Button
        className={"group w-full p-2 primary-border-radius"}
        onClick={() => modalState.openModal()}
      >
        {formContext.getValues("title") ? (
          <div className="gap-x-1 break-keep default-flex">
            <span
              className={
                "font-bold text-primary-100 group-hover:text-contrast-1"
              }
            >
              {formContext.getValues("title")}
            </span>
            <span className={"font-bold group-hover:text-contrast-1"}> - </span>
            <span
              className={
                "font-bold text-secondary-100 group-hover:text-contrast-1"
              }
            >
              {formContext.getValues("firstCategoryName")}
            </span>
            <span className={"font-bold group-hover:text-contrast-1"}> - </span>
            <span
              className={"font-bold text-third-100 group-hover:text-contrast-1"}
            >
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
            className="relative grid h-[calc(100%-2rem)] max-h-[46rem] w-full max-w-[37.5rem] grid-rows-[3rem_3rem_3rem_3rem_16rem] gap-y-2 overflow-y-scroll rounded-[1rem] bg-default-1 px-[2.25rem] pb-[1.75rem] pt-[5rem] scrollbar-hide"
          >
            <ThemeInput1
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={"flex items-center p-2 text-[1.5rem] font-bold"}
              placeholder={"제목 (최대 60자)"}
              maxLength={60}
            />
            <ThemeInput1
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={"flex items-center p-2 text-[1.25rem]"}
              placeholder={"설명 (최대 60자)"}
              maxLength={60}
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
                "h-[16rem] w-full primary-border-radius default-flex"
              }
              htmlFor={"image"}
            >
              {imageUrl && (
                <div className="relative aspect-square h-full">
                  <Image
                    src={imageUrl}
                    alt={"image"}
                    className="rounded-[1rem] p-2"
                    fill
                  />
                </div>
              )}
            </label>
            <div className="flex h-[3rem] gap-x-2">
              <ThemeActiveButton1
                isActive={blog2Status == "PUBLIC"}
                className={"h-full w-full rounded-none rounded-l-2xl"}
                onClick={() => handleBlog2Status("PUBLIC")}
              >
                PUBLIC
              </ThemeActiveButton1>
              <ThemeActiveButton1
                isActive={blog2Status == "HIDE"}
                className={"h-full w-full rounded-none"}
                onClick={() => handleBlog2Status("HIDE")}
              >
                HIDE
              </ThemeActiveButton1>
              <ThemeActiveButton1
                isActive={blog2Status == "DEVELOP"}
                className={"h-full w-full rounded-none rounded-r-2xl"}
                onClick={() => handleBlog2Status("DEVELOP")}
              >
                DEVELOP
              </ThemeActiveButton1>
            </div>
            <ThemeButton1
              className={"h-[3rem] w-full p-2"}
              onClick={() => handleSaveClick()}
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
                    {blogCategoryList.map((i) => (
                      <Button
                        onClick={() =>
                          handleFirstCategory({
                            id: i.id,
                            name: i.name,
                          })
                        }
                        key={i.id}
                        className={`h-[3rem] min-w-[3rem] bg-primary-20 p-2 primary-border-radius ${firstCategory.id == i.id && "bg-primary-20"}`}
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
                      blogCategoryList
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
                            className={`h-[3rem] min-w-[3rem] bg-primary-20 p-2 primary-border-radius ${secondCategory.id == j.id && "bg-primary-20"}`}
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
