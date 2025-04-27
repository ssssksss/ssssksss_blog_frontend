import CustomEditor from "@component/common/editor/CustomEditor";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import useModalState from "@hooks/useModalState";
import { fetchMultipartRetry } from "@utils/api/fetchMultipartRetry";
import clog from "@utils/logger/logger";
import { Blog2CreateBasicContentYup } from "@utils/validation/BlogYup";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm
} from "react-hook-form";
import Blog2SubCreateUpdateHeader from "../../../view/common/Blog2SubCreateUpdateHeader";
import Blog2BasicCreateUpdateCategoryAndTitleForm from "./Blog2BasicCreateUpdateCategoryAndTitleForm";

interface IFormContext {
  title: string;
  content: string;
  firstCategoryId: number;
  secondCategoryId: number;
  blobImageList: {url: string; file: File}[];
  deleteImageBucketDirectory?: string[];
}

const Blog2BasicCreateUpdateContentModal = (
  props: IBlog2BasicCreateUpdateContentModal,
) => {

  const modalState = useModalState(props.edit ? true : false);
  const blog2ContentFormContext = useForm<IFormContext>({
    resolver: yupResolver(Blog2CreateBasicContentYup),
    mode: "onChange",
    defaultValues: {
      title: props.edit ? props.blog2BasicContentItem?.title : "",
      content: props.edit ? props.blog2BasicContentItem?.content : "",
      firstCategoryId: props.edit ? props.blog2BasicContentItem?.blog2FirstCategoryId : 0,
      secondCategoryId: props.edit ? props.blog2BasicContentItem?.blog2SecondCategoryId : 0,
      blobImageList: [],
    },
  });

  const handleSubmitClick: SubmitHandler<any> = async (data) => {
    clog.info(`블로그 기초 글 ${props.edit ? "수정 시작" : "생성 시작"}`);
    const imageUrlList: string[] = [];
    const imageFileList: File[] = [];
    const deleteImageBucketDirectory: string[] = []; // edit에서 삭제에 필요한 이미지 s3 버킷 경로 수집
    const formData = new FormData();

    // 미리보기 이미지들 중에 내용에 남아있는 미리보기 이미지들의 경로를 탐색
    blog2ContentFormContext.getValues("blobImageList").map((i) => {
      if (blog2ContentFormContext.getValues("content").search(i.url) != -1) {
        imageUrlList.push(i.url);
        imageFileList.push(i.file);
      }
    });

    // 이전 내용 안에 삭제할 이미지가 있나 탐색 => 삭제할 이미지는 deleteImageBucketDirectory에 보관
    if (props.edit) {
      const regex =
        /https:\/\/ssssksssblogbucket\.s3\.ap-northeast-2\.amazonaws\.com\/([^\s]+?\.(webp|svg|jpg|gif|png|jpeg))/g;
      let matches;
      const prevBlog2ContentImageList = [];
      while ((matches = regex.exec(props.blog2BasicContentItem!.content)) !== null) {
        prevBlog2ContentImageList.push(matches[1]);
      }

      // 내용에서 기존 이미지 URL을 검색을 해보았는데 없다고 판단이 되면 삭제해도 되는 URL로 판단
      prevBlog2ContentImageList?.map((i) => {
        if (blog2ContentFormContext.getValues("content").search(i) === -1) {
          deleteImageBucketDirectory.push(i);
          formData.append("deleteImageBucketDirectory", i);
        }
      });
    }

    // API 공통 작업
    if (props.edit) {
      formData.append("id", props.blog2BasicContentItem!.id + "");
    }
    formData.append("title", blog2ContentFormContext.getValues("title"));
    formData.append("content", blog2ContentFormContext.getValues("content"));
    formData.append(
      "firstCategoryId",
      blog2ContentFormContext.getValues("firstCategoryId") + "",
    );
    formData.append(
      "secondCategoryId",
      blog2ContentFormContext.getValues("secondCategoryId") + "",
    );
    imageUrlList.map((i) => {
      formData.append("imageUrlList", i);
    });
    imageFileList.map((i) => {
      formData.append("imageFileList", i);
    });

    clog.info("API 요청");
    const response: Response = await fetchMultipartRetry({
      url: "/api/blog2/basic",
      method: props.edit ? "PUT" : "POST",
      formData: formData,
    });
    clog.info(`API 응답 ${response.status}`);

    // 모달 컴포넌트로 감싸져 있어서 자동으로 toast 메시지 출력
    if (!response.ok) {
      return {
        type: "error",
        message: props.edit ? "수정 실패" : "생성 실패",
      };
    }
    
    if (props.edit) {
      // 블로그 기초 수정 성공시
      const result: responseCreateUpdateBlog2BasicContent =
      await response.json();
      props.updateBlog2BasicContent!(result.data.blog2BasicContent);
      props.closeModalAfterSuccess!();
      return {
        message: result.msg,
      };
    } else {
      // 블로그 기초 생성 성공시
      const result: responseCreateUpdateBlog2BasicContent =
      await response.json();
      props.addBlog2BasicContent!(result.data.blog2BasicContent);
      props.closeModalAfterSuccess!();
      return {
        message: result.msg,
      };
    }
  };

  const onClickErrorSubmit: SubmitErrorHandler<any> = () => {
    alert("잘못 입력된 값이 존재합니다.");
  };

  const handleContentChange = (value: string) => {
    blog2ContentFormContext.setValue("content", value, {shouldValidate: true});
  };

  const handleFileChange = (url: string, file: File) => {
    const currentList =
      blog2ContentFormContext.getValues("blobImageList") || [];
    blog2ContentFormContext.setValue(
      "blobImageList",
      [...currentList, {url, file}],
      {shouldValidate: true},
    );
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
            blog2ContentFormContext.handleSubmit(
              handleSubmitClick,
              onClickErrorSubmit,
            ),
          )
        }
        saveDisabled={!blog2ContentFormContext.formState.isValid}
        edit={props.edit ?? false}
        modalState={modalState}
      />
      {!modalState.isOpen && (
        <Blog2BasicCreateUpdateCategoryAndTitleForm
          formContext={blog2ContentFormContext}
          isEdit={props.edit}
          blog2BasicContentItem={props.blog2BasicContentItem}
        />
      )}
      <CustomEditor
        defaultValue={props.edit ? props.blog2BasicContentItem!.content : ""}
        handleContentChange={handleContentChange}
        handleFileChange={handleFileChange}
      />
    </ModalTemplate>
  );
};
export default Blog2BasicCreateUpdateContentModal;
