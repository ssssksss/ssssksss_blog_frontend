import CustomEditor from "@component/common/editor/CustomEditor";
import Input from "@component/common/input/Input";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import useModalState from "@hooks/useModalState";
import { fetchMultipartRetry } from "@utils/api/fetchMultipartRetry";
import { Blog2ResultYup } from "@utils/validation/BlogYup";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Blog2SubCreateUpdateHeader from "./Blog2SubCreateUpdateHeader";

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
  const { id: blogId } = useParams();
  const modalState = useModalState(props.edit ? true : false);
  
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
      url: "/api/blog2/result",
      method: props.edit ? "PUT" : "POST",
      formData: formData,
    });
  
    if (!response.ok) {
      return {
        type: "error",
        message: props.edit ? "수정 실패" : "생성 실패",
      };
    }
    if (props.edit) {
      // 블로그 결과 수정 성공시
      const result: responseCreateUpdateBlog2Result = await response.json();
        props.updateBlog2Result!(result.data.blog2Result);
        props.closeModal!();
        return {
          message: result.msg,
        };
    } else {
      // 블로그 결과 생성 성공시
      const result: responseCreateUpdateBlog2Result =
        await response.json();
        props.addBlog2Result!(result.data.blog2Result);
        props.closeModal!();
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
        "grid h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] grid-rows-[3rem_auto]"
      }
    >
      {props.closeButtonComponent}
      <Blog2SubCreateUpdateHeader
        type={"result"}
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
        <div className="absolute left-[1rem] top-[8rem] flex w-[calc(100%-2rem)] grid-rows-3 flex-col gap-y-2 bg-white-100 p-4 default-outline">
          <Input
            type={"text"}
            register={blog2ContentFormContext.register("title")}
            className={"flex h-[3rem] items-center px-2 default-outline"}
            placeholder="제목 입력"
          />
        </div>
      )}
      <CustomEditor
        defaultValue={props.edit ? props.item!.content : ""}
        handleContentChange={handleContentChange}
        handleFileChange={handleFileChange}
      />
    </ModalTemplate>
  );
};
export default Blog2ResultCreateUpdateModal;
