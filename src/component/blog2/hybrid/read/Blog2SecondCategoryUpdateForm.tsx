import ThemeButton1 from "@component/common/button/ThemeButton1";
import Dropdown from "@component/common/dropdown/Dropdown";
import CustomEditor from "@component/common/editor/CustomEditor";
import Input from "@component/common/input/Input";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDragAndDropBlob } from "@hooks/useDragAndDropBlob";
import useFetchCSR from "@hooks/useFetchCSR";
import { Blog2SecondCategoryUpdateYup } from "@utils/validation/BlogCategoryYup";
import { AWSS3Prefix } from "@utils/variables/s3url";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";
import useBlog2Store from "src/store/blog2Store";

interface IBlog2SecondCategoryUpdateForm {
  closeModal: () => void;
}
const Blog2SecondCategoryUpdateForm = (
  props: IBlog2SecondCategoryUpdateForm,
) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const searchParams = useSearchParams();
  const blog2Store = useBlog2Store();
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const fetchCSR = useFetchCSR();
  const [templateContent, setTemplateContent] = useState("");

  const {register, handleSubmit, formState, watch, getValues, setValue} =
    useForm<Blog2SecondCategoryUpdateForm>({
      resolver: yupResolver(Blog2SecondCategoryUpdateYup),
      mode: "onChange",
      defaultValues: {
        id: 0,
        updateSecondCategoryName: "",
        updateSecondCategoryImageFile: undefined,
        templateContent: "",
        s3ImageUrlList: [],
      },
    });

  const updateSecondCategoryHandler = async (
    data: Blog2SecondCategoryUpdateForm,
  ) => {
    const formData = new FormData();
    const s3ImageUrlDeleteList: {keyPath: string}[] = [];
    // 지울 이미지가 있는지 확인
    const initTemplateContent = templateContent;

    const regex =
      /https:\/\/ssssksssblogbucket\.s3\.ap-northeast-2\.amazonaws\.com\/([^\s\?\#]+?\.(webp|svg|jpg|gif|png|jpeg))(?![\?\#])/g;
    let matches;
    const prevBlog2ContentImageUrlList: string[] = [];

    // 기존 내용에서 이미지 경로를 전부 추출
    while ((matches = regex.exec(initTemplateContent)) !== null) {
      prevBlog2ContentImageUrlList.push(matches[1]);
    }

    // 새로운 내용에 이미지 경로가 안보이면 지울 경로로 판단
    prevBlog2ContentImageUrlList.forEach((i) => {
      if (!data.templateContent.includes(i)) {
        s3ImageUrlDeleteList.push({
          keyPath: i
        });
      }
    });

    // 이후 작업
    
    formData.append("id", data.id + "");

    if (data.updateSecondCategoryName) {
      formData.append(
        "updateSecondCategoryName",
        data.updateSecondCategoryName,
      );
    }

    if (getValues("updateSecondCategoryImageFile")) {
      formData.append(
        "updateSecondCategoryImageFile",
        data.updateSecondCategoryImageFile as File,
      );
    }

    if (s3ImageUrlDeleteList.length > 0) {
      formData.append(
        "s3ImageUrlDeleteList",
        JSON.stringify(s3ImageUrlDeleteList),
      );
    }
    formData.append("s3ImageUrlList", JSON.stringify(data.s3ImageUrlList));
    formData.append("templateContent", data.templateContent);

    const result: ISecondCategory | undefined =
        await fetchCSR.requestWithHandler({
          url: "/api/blog2/category/second",
          method: "PUT",
          formData: formData,
          handleRevalidateTags: ["blog2CategoryList"],
          showSuccessToast: true,
          successMessage: "2번째 카테고리를 수정",
        });
    if (result == undefined) return;

    const temp = blog2Store.categoryList.map((i) => {
      if (i.id == +searchParams.get("firstCategoryId")!) {
        i.blog2SecondCategoryList?.map((j) => {
          if (j.id == result.id) {
            j.name = result.name;
            j.thumbnailImageUrl = result.thumbnailImageUrl;
            j.templateContent = result.templateContent;
          }
        });
      }
      return i;
    });
    blog2Store.setBlog2CategoryList(temp);
    props.closeModal && props.closeModal();
  };

  const fakeImageUpload = ({file, url}: {file: File; url: string}) => {
    setImageUrl(url);
    setValue("updateSecondCategoryImageFile", file, {shouldValidate: true});
  };

  const {isDragging, onDragEnter, onDragLeave, onDragOver, onDropOrInputEvent} =
    useDragAndDropBlob({fakeImageUpload});

  const dropdownHandler = (id: number) => {
    blog2Store.categoryList
      .filter((i) => i.id + "" == searchParams.get("firstCategoryId"))[0]
      .blog2SecondCategoryList?.forEach((j) => {
        if (j.id == id) {
          setImageUrl(AWSS3Prefix + "" + j.thumbnailImageUrl);
          setValue("updateSecondCategoryImageFile", undefined);
          setValue("updateSecondCategoryName", j.name);
          setValue("id", j.id, { shouldValidate: true });
          setValue("templateContent", j.templateContent || "");
          setUpdateCategoryName(j.name);
          setTemplateContent(j.templateContent);
        }
      });
  };

  const handleContentChange = useCallback((value: string) => {
    setValue("templateContent", value, { shouldValidate: true });
  },[]);
    
  const addS3ImageUrl = useCallback((keyPath: string) => {
    const currentList =
        getValues("s3ImageUrlList") || [];
    setValue(
      "s3ImageUrlList",
      [...currentList, {keyPath}],
      {shouldValidate: true},
    );
  }, []);

  return (
    <div className={"flex w-full flex-col gap-y-4"}>
      <div
        className={
          "flex h-[3rem] items-center justify-center rounded-2xl primary-border primary-set"
        }
      >
        {blog2Store.categoryList.map(
          (el) =>
            el.id == Number(searchParams.get("firstCategoryId")) && el.name,
        )}
      </div>

      <Dropdown
        options={
          blog2Store.categoryList
            .filter((i) => i.id + "" === searchParams.get("firstCategoryId"))[0]
            ?.blog2SecondCategoryList?.map((i) => ({
              value: i.id,
              name: i.name,
            })) || []
        }
        value={0}
        defaultValue={0}
        dropdownHandler={dropdownHandler}
        containerClassName="min-h-[3rem] rounded-2xl"
      />
      <ThemeInput1
        placeholder="변경할 2번째 카테고리 이름"
        className={`min-h-[3rem] ${imageUrl || "cursor-not-allowed"}`}
        value={updateCategoryName}
        disabled={!imageUrl}
        onChange={(e) => {
          setValue("updateSecondCategoryName", e.target.value, {
            shouldValidate: true,
          });
          setUpdateCategoryName(e.target.value);
        }}
      />
      <label
        className={`relative z-50 h-[16rem] w-full rounded-2xl primary-border ${imageUrl ? "cursor-pointer" : "cursor-not-allowed"}`}
        htmlFor={"imageUpload"}
        onDragEnter={imageUrl ? undefined : onDragEnter}
        onDragLeave={imageUrl ? undefined : onDragLeave}
        onDragOver={imageUrl ? undefined : onDragOver}
        onDrop={imageUrl ? undefined : onDropOrInputEvent}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="image"
            layout="fill"
            className="rounded-[1rem] object-contain p-1"
          />
        ) : (
          <div className="h-full w-full flex-col default-flex">
            <CiImageOn size={72} />
            <span> 카테고리를 먼저 선택 이후에 이미지를 넣으세요 </span>
          </div>
        )}
      </label>
      <Input
        id="imageUpload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onDropOrInputEvent}
        disabled={!imageUrl}
      />
      <div className="h-[40rem]">
        <div
          className={
            "mb-2 flex h-[3rem] items-center justify-center rounded-2xl primary-border primary-set"
          }
        >
          템플릿
        </div>
        <div className="h-[calc(100%-1rem)]">
          <CustomEditor
            defaultValue={""}
            handleContentChange={handleContentChange}
            addS3ImageUrl={addS3ImageUrl}
            isPreview={true}
            refreshValue={templateContent}
            s3DirectoryPath="blog2/second-category-template"
          />
        </div>
      </div>
      {/* TODO : 다시 처음 값으로 돌아올 경우 유효하지 않게 수정 */}
      <ThemeButton1
        onClick={handleSubmit(updateSecondCategoryHandler)}
        disabled={!formState.isValid}
        className={"h-[3rem]"}
      >
        추가
      </ThemeButton1>
    </div>
  );
};
export default Blog2SecondCategoryUpdateForm;
