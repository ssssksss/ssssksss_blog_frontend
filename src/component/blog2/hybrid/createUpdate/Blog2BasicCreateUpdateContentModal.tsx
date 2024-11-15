import Button from "@component/common/button/hybrid/Button";
import Dropdown from "@component/common/dropdown/Dropdown";
import CustomEditor from "@component/common/editor/CustomEditor";
import Input from "@component/common/input/Input";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import useModalState from "@hooks/useModalState";
import { EditorCreateUpdateTitleStyle } from "@utils/editor/EditorTailwindcssStyle";
import { Blog2CreateBasicContentYup } from "@utils/validation/BlogYup";
import { PanelBottomClose, PanelBottomOpen } from "lucide-react";
import { useEffect, useState } from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import useBlog2Store from "src/store/blog2Store";
import useToastifyStore from "src/store/toastifyStore";

interface IFormContext {
  title: string;
  content: string;
  firstCategoryId: number;
  secondCategoryId: number;
  blobImageList: {url: string; file: File}[];
  deleteImageBucketDirectory?: string[];
}

interface IBlog2BasicCreateUpdateContentModal extends IModalComponent {
  edit?: boolean;
  item?: IBlog2BasicContent;
  updateBlog2BasicContent?: (data: IBlog2BasicContent) => void;
  addBlog2BasicContent?: (data: IBlog2BasicContent) => void;
}

const Blog2BasicCreateUpdateContentModal = (
  props: IBlog2BasicCreateUpdateContentModal,
) => {
  const blog2Store = useBlog2Store();
  const [secondCategoryList, setSecondCategoryList] = useState<
    IBlog2SecondCategoryList[]
  >([]);
  const modalState = useModalState(props.edit ? true : false);
  const [loading, setIsLoading] = useState(false);
  const blog2FormContext = useFormContext();
  const toastifyStore = useToastifyStore();
  const blog2ContentFormContext = useForm<IFormContext>({
    resolver: yupResolver(Blog2CreateBasicContentYup),
    mode: "onChange",
    defaultValues: {
      title: props.edit ? props.item?.title : "",
      content: props.edit ? props.item?.content : "",
      firstCategoryId: props.edit ? props.item?.blog2FirstCategoryId : 0,
      secondCategoryId: props.edit ? props.item?.blog2SecondCategoryId : 0,
      blobImageList: [],
    },
  });

  const handleSubmitClick: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    // store.dispatch(setIsLoading(true));
    const imageUrlList: string[] = [];
    const imageFileList: File[] = [];
    const deleteImageBucketDirectory: string[] = []; // edit에서 삭제에 필요한 이미지 s3 버킷 경로 수집
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
          deleteImageBucketDirectory.push(i);
          formData.append("deleteImageBucketDirectory", i);
        }
      });
    }

    // 미리보기가 안보여 바꾼 텍스트를 다시 원래대로 전환
    // blog2ContentFormContext.setValue(
    //   "content",
    //   StringFunction.replaceAll(
    //     blog2ContentFormContext.getValues("content"),
    //     "](blob:http",
    //     "](http",
    //   ),
    // );

    // API 공통 작업
    if (props.edit) {
      formData.append("id", props.item!.id + "");
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

    // 블로그 수정 API
    if (props.edit) {
      const response = await fetch("/api/blog2/basic", {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) {
        toastifyStore.setToastify({
          type: "error",
          message: "수정이 실패했습니다.",
        });
        return;
      }
      const result: responseCreateUpdateBlog2BasicContent =
        await response.json();
      props.updateBlog2BasicContent!(result.data.blog2BasicContent);
      props.closeModal!();
    }

    // 블로그 생성 API
    if (!props.edit) {
      const response = await fetch("/api/blog2/basic", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        toastifyStore.setToastify({
          type: "error",
          message: "기초 글 작성에 실패했습니다.",
        });
        return;
      }
      const result: responseCreateUpdateBlog2BasicContent =
        await response.json();
      props.addBlog2BasicContent!(result.data.blog2BasicContent);
      props.closeModal!();
    }
  };

  const onClickErrorSubmit: SubmitErrorHandler<any> = () => {
    alert("잘못 입력된 값이 존재합니다.");
  };
  const handleClickFirstCategory = (value: number) => {
    blog2ContentFormContext.setValue("firstCategoryId", value);
    blog2Store.categoryList.map((i) => {
      if (i.id == value) {
        setSecondCategoryList([]);
        if (i.blog2SecondCategoryList?.length) {
          setSecondCategoryList(i.blog2SecondCategoryList);
        }
      }
    });
  };
  const handleClickSecondCategory = (value: number) => {
    blog2ContentFormContext.setValue("secondCategoryId", value, {
      shouldValidate: true,
    });
    blog2ContentFormContext.watch();
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
      blog2ContentFormContext.setValue(
        "firstCategoryId",
        props.item!.blog2FirstCategoryId,
      );
      blog2ContentFormContext.setValue(
        "secondCategoryId",
        props.item!.blog2SecondCategoryId,
      );
      const firstCategory = blog2Store.categoryList.filter(
        (i) => i.id == props.item!.blog2FirstCategoryId,
      )[0];
      setSecondCategoryList(firstCategory.blog2SecondCategoryList!);
      blog2ContentFormContext.watch();
    }
  }, []);

  return (
    <ModalTemplate
      className={
        "grid h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] grid-rows-[3rem_auto_3rem] gap-y-4 p-8"
      }
    >
      {props.closeButtonComponent}
      <h2
        className={
          "max-w-[576px]:text-[2rem] min-w-[576px]:text-[3rem] gap-x-2 font-bold default-flex"
        }
      >
        <h2> 블로그 기초 글 {props.edit ? "수정" : "생성"} </h2>
        <button
          className={`p-2 default-outline default-flex ${modalState.isOpen ? "bg-primary-20 " : ""} `}
          onClick={() =>
            modalState.isOpen ? modalState.closeModal() : modalState.openModal()
          }
        >
          {modalState.isOpen ? <PanelBottomClose /> : <PanelBottomOpen />}
        </button>
      </h2>
      {!modalState.isOpen && (
        <div className="absolute left-[1rem] top-[9rem] flex min-h-[12rem] w-[calc(100vw-3rem)] grid-rows-3 flex-col gap-y-2 bg-gray-40 p-4 default-outline">
          <Dropdown
            options={blog2Store.categoryList.map((i) => {
              return {
                value: i.id,
                name: i.name,
              };
            })}
            value={
              blog2ContentFormContext.getValues("firstCategoryId") ||
              props.item?.blog2FirstCategoryId ||
              0
            }
            defaultValue={props.item?.blog2FirstCategoryId || 0}
            dropdownHandler={handleClickFirstCategory}
            placeholder={"카테고리1"}
            containerClassName={"min-h-12 bg-white-80"}
          />
          <Dropdown
            options={secondCategoryList.map((i) => {
              return {
                value: i.id,
                name: i.name,
              };
            })}
            value={
              blog2ContentFormContext.getValues("secondCategoryId") ||
              props.item?.blog2SecondCategoryId ||
              0
            }
            defaultValue={props.item?.blog2SecondCategoryId || 0}
            dropdownHandler={handleClickSecondCategory}
            placeholder={"카테고리2"}
            disabled={
              !blog2ContentFormContext.getValues("firstCategoryId") ||
              secondCategoryList.length < 1
            }
            containerClassName={"min-h-12 bg-white-80"}
          />
          <Input
            type={"text"}
            register={blog2ContentFormContext.register("title")}
            className={EditorCreateUpdateTitleStyle}
            placeholder="제목"
          />
        </div>
      )}
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
          }
        >
          {props.edit ? "수정" : "생성"}
        </Button>
        <Button
          onClick={() => props.closeModal && props.closeModal()}
          className={
            "h-[3rem] w-full default-outline default-flex hover:bg-red-20"
          }
        >
          취소
        </Button>
        {/* <span> {errors.변수?.message} </span> */}
      </div>
    </ModalTemplate>
  );
};
export default Blog2BasicCreateUpdateContentModal;
