import CustomEditor from "@component/common/editor/CustomEditor";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetchCSR from "@hooks/useFetchCSR";
import useModalState from "@hooks/useModalState";
import { Blog2CreateBasicContentYup } from "@utils/validation/BlogYup";
import { useCallback, useState } from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useFormContext
} from "react-hook-form";
import Blog2SubCreateUpdateHeader from "../../../view/common/Blog2SubCreateUpdateHeader";
import Blog2BasicCreateUpdateCategoryAndTitleForm from "./Blog2BasicCreateUpdateCategoryAndTitleForm";

/**
 * 
 * @description 블로그 기초 내용을 작성하는 공간  
 * 
 */

const Blog2BasicCreateUpdateContentModal = (
  props: IBlog2BasicCreateUpdateContentModal,
) => {

  const modalState = useModalState(props.edit ? true : false);
  const fetchCSR = useFetchCSR();
  const formContext = useFormContext();
  const [templateContent ,setTemplateContent] = useState("");
  const blog2BasicContentFormContext = useForm<IBlog2BasicFormContext>({
    resolver: yupResolver(Blog2CreateBasicContentYup),
    mode: "onChange",
    defaultValues: {
      title: props.edit ? props.blog2BasicContentItem?.title : "",
      content: props.edit ? props.blog2BasicContentItem?.content : "",
      firstCategoryId: props.edit
        ? props.blog2BasicContentItem?.blog2FirstCategoryId
        : formContext.getValues("firstCategoryId") || 0,
      secondCategoryId: props.edit
        ? props.blog2BasicContentItem?.blog2SecondCategoryId
        : formContext.getValues("secondCategoryId") || 0,
      s3ImageUrlList: [],
    },
  });

  const handleSubmitClick: SubmitHandler<any> = async (data) => {
    const addImageUrlList: string[] = [];
    const deleteImageBucketDirectory: string[] = [];

    // [1] 추가된 이미지 처리(글 작성 중에 사용하지 않는 이미지는 등록하지 않음, 사용중인 이미지만 필터링)
    blog2BasicContentFormContext.getValues("s3ImageUrlList").forEach((i) => {
      if (
        blog2BasicContentFormContext.getValues("content").includes(i.keyPath)
      ) {
        addImageUrlList.push(i.keyPath);
      }
    });

    // [2] 안쓰는 이미지 삭제 (edit 모드)
    if (props.edit) {
      const regex =
        /https:\/\/ssssksssblogbucket\.s3\.ap-northeast-2\.amazonaws\.com\/([^\s\?\#]+?\.(webp|svg|jpg|gif|png|jpeg))(?![\?\#])/g;
      let matches;
      const prevBlog2ContentImageUrlList: string[] = [];

      while (
        (matches = regex.exec(props.blog2BasicContentItem!.content)) !== null
      ) {
        prevBlog2ContentImageUrlList.push(matches[1]);
      }

      prevBlog2ContentImageUrlList.forEach((i) => {
        if (!blog2BasicContentFormContext.getValues("content").includes(i)) {
          deleteImageBucketDirectory.push(i);
        }
      });
    }

    // [3] FormData로 변환
    const formData = new FormData();
    if (props.edit) formData.append("id", props.blog2BasicContentItem!.id + "");
    formData.append("title", blog2BasicContentFormContext.getValues("title"));
    formData.append(
      "content",
      blog2BasicContentFormContext.getValues("content"),
    );
    formData.append(
      "firstCategoryId",
      blog2BasicContentFormContext.getValues("firstCategoryId") + "",
    );
    formData.append(
      "secondCategoryId",
      blog2BasicContentFormContext.getValues("secondCategoryId") + "",
    );

    addImageUrlList.forEach((url) => {
      formData.append("imageUrlList", url);
    });

    if (props.edit) {
      deleteImageBucketDirectory.forEach((path) => {
        formData.append("deleteImageBucketDirectory", path);
      });
    }

    // [4] 요청
    const result: IBlog2BasicContent = await fetchCSR.requestWithHandler({
      url: "/api/blog2/basic",
      method: props.edit ? "PUT" : "POST",
      formData: formData,
    });

    if (result == undefined) return;

    if (props.edit) {
      // 블로그 기초 수정 성공시
      props.updateBlog2BasicContent!(result);
      props.closeModalAfterSuccess!();
    } else {
      // 블로그 기초 생성 성공시
      props.addBlog2BasicContent!(result);
      props.closeModalAfterSuccess!();
    }
  };

  const onClickErrorSubmit: SubmitErrorHandler<any> = () => {
    alert("잘못 입력된 값이 존재합니다.");
  };

  const handleContentChange = useCallback((value: string) => {
    blog2BasicContentFormContext.setValue("content", value, {shouldValidate: true});
  },[]);

  const addS3ImageUrl = useCallback((keyPath: string) => {
    const currentList =
      blog2BasicContentFormContext.getValues("s3ImageUrlList") || [];
    blog2BasicContentFormContext.setValue(
      "s3ImageUrlList",
      [...currentList, { keyPath }],
      { shouldValidate: true },
    );
  }, []);

  const changeContentUsingTemplate = (value: string) => {
    setTemplateContent(value);
  };

  return (
    <ModalTemplate
      className={
        "grid h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] grid-rows-[3rem_auto]"
      }
    >
      {props.closeButtonComponent}
      <Blog2SubCreateUpdateHeader
        type={"basic"}
        saveHandler={() =>
          props.loadingWithHandler(
            blog2BasicContentFormContext.handleSubmit(
              handleSubmitClick,
              onClickErrorSubmit,
            ),
          )
        }
        saveDisabled={!blog2BasicContentFormContext.formState.isValid}
        edit={props.edit ?? false}
        modalState={modalState}
      />
      {/* 블로그 기초의 제목이나 카테고리1,2를 설정 하는 공간 */}
      {!modalState.isOpen && (
        <Blog2BasicCreateUpdateCategoryAndTitleForm
          formContext={blog2BasicContentFormContext}
          isEdit={props.edit}
          blog2BasicContentItem={props.blog2BasicContentItem}
          changeContentUsingTemplate={changeContentUsingTemplate}
        />
      )}
      {/* 블로그 글 작성하는 공간 */}
      <CustomEditor
        defaultValue={props.edit ? props.blog2BasicContentItem!.content : ""}
        handleContentChange={handleContentChange}
        addS3ImageUrl={addS3ImageUrl}
        isPreview={true}
        refreshValue={templateContent}
      />
    </ModalTemplate>
  );
};
export default Blog2BasicCreateUpdateContentModal;
