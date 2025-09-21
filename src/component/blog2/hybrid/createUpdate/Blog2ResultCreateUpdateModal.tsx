import Blog2SubCreateUpdateHeaderView from "@component/blog2/view/common/Blog2SubCreateUpdateHeader";
import CustomEditor from "@component/common/editor/CustomEditor";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetchCSR from "@hooks/useFetchCSR";
import useModalState from "@hooks/useModalState";
import useToastifyStore from "@store/toastifyStore";
import { Blog2ResultYup } from "@utils/validation/BlogYup";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

interface IBlog2ResultCreateUpdateModal extends IModalComponent {
  edit?: boolean;
  item?: IBlog2Result;
  updateBlog2Result?: (data: IBlog2Result) => void;
  addBlog2Result?: (data: IBlog2Result) => void;
}

const Blog2ResultCreateUpdateModal = (props: IBlog2ResultCreateUpdateModal) => {
  const { id: blogId } = useParams();
  const modalState = useModalState(props.edit ? true : false);
  const fetchCSR = useFetchCSR();
  const toastifyStore = useToastifyStore();
  
  const blog2ResultContentFormContext = useForm<IBlog2ResultFormContext>({
    resolver: yupResolver(Blog2ResultYup),
    mode: "onChange",
    defaultValues: {
      id: props.edit ? props.item?.id : 0,
      title: props.edit ? props.item?.title : "",
      content: props.edit ? props.item?.content : "",
      position: props.edit ? props.item?.position : 0,
      s3ImageUrlList: [],
    },
  });

  const handleSubmitClick: SubmitHandler<any> = async (data) => {
    const addImageUrlList: string[] = [];
    const deleteImageBucketDirectory: string[] = [];

    // [1] 추가된 이미지 처리(글 작성 중에 사용하지 않는 이미지는 등록하지 않음, 사용중인 이미지만 필터링)
    blog2ResultContentFormContext.getValues("s3ImageUrlList").map((i) => {
      if (
        blog2ResultContentFormContext.getValues("content").search(i.keyPath) !=
        -1
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
      while ((matches = regex.exec(props.item!.content)) !== null) {
        prevBlog2ContentImageUrlList.push(matches[1]);
      }

      prevBlog2ContentImageUrlList.forEach((i) => {
        if (!blog2ResultContentFormContext.getValues("content").includes(i)) {
          deleteImageBucketDirectory.push(i);
        }
      });
    }
    // [3] FormData로 변환
    const formData = new FormData();
    if (props.edit) {
      formData.append("id", props.item!.id + "");
    }
    if (!props.edit) {
      formData.append("blogId", blogId + "");
      formData.append(
        "position",
        blog2ResultContentFormContext.getValues("position") + "",
      );
    }
    formData.append("title", blog2ResultContentFormContext.getValues("title"));
    formData.append(
      "content",
      blog2ResultContentFormContext.getValues("content"),
    );
    addImageUrlList.forEach((url) => {
      formData.append("imageUrlList", url);
    });

    if (props.edit) {
      deleteImageBucketDirectory.forEach((path) => {
        formData.append("deleteImageBucketDirectory", path);
      });
    }

    await fetchCSR.requestWithHandler({
      url: "/api/blog2/result",
      method: props.edit ? "PUT" : "POST",
      formData: formData,
      handleSuccess: (result: IBlog2Result) => {
        if (props.edit) {
          // 블로그 기초 수정 성공시
          props.updateBlog2Result!(result);
          props.closeModalAfterSuccess!();
        } else {
          // 블로그 기초 생성 성공시
          props.addBlog2Result!(result);
          props.closeModalAfterSuccess!();
        }
      },
      handleFail: () => {
        return;
      }
    });
  };

  const onClickErrorSubmit: SubmitErrorHandler<any> = () => {
    alert("잘못 입력된 값이 존재합니다.");
  };

  const handleContentChange = (value: string) => {
    blog2ResultContentFormContext.setValue("content", value, {shouldValidate: true});
  };

  const addS3ImageUrl = (keyPath: string) => {
    const currentList =
      blog2ResultContentFormContext.getValues("s3ImageUrlList") || [];
    blog2ResultContentFormContext.setValue(
      "s3ImageUrlList",
      [...currentList, {keyPath}],
      {shouldValidate: true},
    );
  };

  useEffect(() => {
    if (props.edit) {
      blog2ResultContentFormContext.setValue("title", props.item!.title);
      blog2ResultContentFormContext.setValue("content", props.item!.content);
      blog2ResultContentFormContext.setValue("position", props.item!.position);
      blog2ResultContentFormContext.watch();
    }
  }, []);

  return (
    <ModalTemplate
      className={
        "grid h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] grid-rows-[3rem_auto]"
      }
    >
      {props.closeButtonComponent}
      <Blog2SubCreateUpdateHeaderView
        type={"result"}
        saveHandler={() =>
          props.loadingWithHandler(
            blog2ResultContentFormContext.handleSubmit(
              handleSubmitClick,
              () => {
                toastifyStore.setToastify({
                  type: "error",
                  message: "잘못 입력된 값이 존재합니다."
                });
              },
            ),
          )
        }
        saveDisabled={!blog2ResultContentFormContext.formState.isValid}
        edit={props.edit ?? false}
        modalState={modalState}
      />
      {!modalState.isOpen && (
        <div className="absolute left-[1rem] top-[7.325rem] z-10 flex w-[calc(100%-2rem)] grid-rows-3 flex-col gap-y-2 bg-default-1 p-4 primary-border">
          <ThemeInput1
            type={"text"}
            register={blog2ResultContentFormContext.register("title")}
            className={"flex h-[3rem] items-center px-2 primary-border-radius"}
            placeholder="제목 입력"
          />
        </div>
      )}
      <CustomEditor
        defaultValue={props.edit ? props.item!.content : ""}
        handleContentChange={handleContentChange}
        addS3ImageUrl={addS3ImageUrl}
        isPreview={true}
        s3DirectoryPath="blog2/result"
      />
    </ModalTemplate>
  );
};
export default Blog2ResultCreateUpdateModal;
