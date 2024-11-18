import Button from "@component/common/button/hybrid/Button";
import CustomEditor from "@component/common/editor/CustomEditor";
import Input from "@component/common/input/Input";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import { yupResolver } from "@hookform/resolvers/yup";
import useLoading from "@hooks/useLoading";
import useModalState from "@hooks/useModalState";
import { fetchMultipartRetry } from "@utils/api/fetchMultipartRetry";
import { Blog2ResultYup } from "@utils/validation/BlogYup";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import useToastifyStore from "src/store/toastifyStore";

interface IFormContext {
  id: number;
  position: number;
  title: string;
  content: string;
  blobImageList: {url: string; file: File}[];
  deleteImageBucketDirectory?: string[];
}

interface IBlog2ResultCreateUpdateModal extends IModalComponent {
  edit?: boolean;
  item?: IBlog2Result;
  updateBlog2Result?: (data: IBlog2Result) => void;
  addBlog2Result?: (data: IBlog2Result) => void;
}

const Blog2ResultCreateUpdateModal = (props: IBlog2ResultCreateUpdateModal) => {
  const toastifyStore = useToastifyStore();
  const { id: blogId } = useParams();
  const modalState = useModalState(props.edit ? true : false);
  const {loading, startLoading, stopLoading} = useLoading();
  
  const blog2ContentFormContext = useForm<IFormContext>({
    resolver: yupResolver(Blog2ResultYup),
    mode: "onChange",
    defaultValues: {
      id: props.edit ? props.item?.id : 0,
      title: props.edit ? props.item?.title : "",
      content: props.edit ? props.item?.content : "",
      position: props.edit ? props.item?.position : 0,
      blobImageList: [],
    },
  });

  const handleSubmitClick: SubmitHandler<any> = async (data) => {
    startLoading();
    // store.dispatch(setIsLoading(true));
    const imageUrlList: string[] = [];
    const imageFileList: File[] = [];
    const formData = new FormData();

    // 미리보기 이미지에서 실제 이미지로 저장하기 위해서 이미지들의 경로를 탐색
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
      while ((matches = regex.exec(props.item!.content)) !== null) {
        prevBlog2ContentImageList.push(matches[1]);
      }

      // 내용에서 기존 이미지 URL을 검색을 해보았는데 없다고 판단이 되면 삭제해도 되는 URL로 판단
      prevBlog2ContentImageList?.map((i) => {
        if (blog2ContentFormContext.getValues("content").search(i) === -1) {
          formData.append("deleteImageBucketDirectory", i);
        }
      });
    }

    // API 공통 작업
    if (props.edit) {
      formData.append("id", props.item!.id + "");
    }
    if (!props.edit) {
      formData.append("blogId", blogId + "");
      formData.append(
        "position",
        blog2ContentFormContext.getValues("position") + "",
      );
    }
    formData.append("title", blog2ContentFormContext.getValues("title"));
    formData.append("content", blog2ContentFormContext.getValues("content"));
    imageUrlList.map((i) => {
      formData.append("imageUrlList", i);
    });
    imageFileList.map((i) => {
      formData.append("imageFileList", i);
    });

    const response: Response = await fetchMultipartRetry({
      url: "api/blog2/result",
      method: props.edit ? "PUT" : "POST",
      formData: formData,
    });
  
    if (!response.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: props.edit
          ? "수정이 실패했습니다."
          : "결과 생성에 실패했습니다.",
      });
      stopLoading();
      return;
    }
    if (props.edit) {
      // 블로그 결과 수정 성공시
      const result: responseCreateUpdateBlog2Result = await response.json();
        props.updateBlog2Result!(result.data.blog2Result);
    } else {
      // 블로그 결과 생성 성공시
      const result: responseCreateUpdateBlog2Result =
          await response.json();
        props.addBlog2Result!(result.data.blog2Result);
    }
    stopLoading();
      props.closeModal!();

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

  useEffect(() => {
    if (props.edit) {
      blog2ContentFormContext.setValue("title", props.item!.title);
      blog2ContentFormContext.setValue("content", props.item!.content);
      blog2ContentFormContext.setValue("position", props.item!.position);
      blog2ContentFormContext.watch();
    }
  }, []);

  return (
    <ModalTemplate
      className={
        "grid h-[100vh] max-h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] max-w-[75rem] grid-rows-[3rem_3rem_calc(100%-12rem)_3rem] gap-y-4 p-8"
      }>
      {props.closeButtonComponent}
      <LoadingSpinner loading={loading} />
      <h2
        className={
          "max-w-[576px]:text-[2rem] min-w-[576px]:text-[3rem] font-bold default-flex"
        }>
        블로그 결과 글 {props.edit ? "수정" : "생성"}
      </h2>
      <Input
        type={"text"}
        register={blog2ContentFormContext.register("title")}
        className={"flex h-[3rem] items-center px-2 default-outline"}
        placeholder="제목 입력"
      />
      <CustomEditor
        defaultValue={props.edit ? props.item!.content : ""}
        handleContentChange={handleContentChange}
        handleFileChange={handleFileChange}
      />
      <div className={"mt-auto flex h-[3rem] w-full gap-x-2"}>
        <Button
          onClick={blog2ContentFormContext.handleSubmit(
            handleSubmitClick,
            onClickErrorSubmit,
          )}
          disabled={!blog2ContentFormContext.formState.isValid}
          className={
            "h-[3rem] w-full bg-primary-60 text-white-80 default-outline default-flex hover:bg-primary-20 disabled:bg-gray-80"
          }>
          {props.edit ? "수정" : "생성"}
        </Button>
        <Button
          onClick={() => props.closeModal && props.closeModal()}
          className={
            "h-[3rem] w-full default-outline default-flex hover:bg-red-20"
          }>
          취소
        </Button>
        {/* <span> {errors.변수?.message} </span> */}
      </div>
    </ModalTemplate>
  );
};
export default Blog2ResultCreateUpdateModal;
