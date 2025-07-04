import ThemeButton1 from "@component/common/button/ThemeButton1";
import Input from "@component/common/input/Input";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDragAndDropBlob } from "@hooks/useDragAndDropBlob";
import useFetchCSR from "@hooks/useFetchCSR";
import { Blog2SecondCategoryCreateYup } from "@utils/validation/BlogCategoryYup";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";
import useBlog2Store from "src/store/blog2Store";
interface IBlog2SecondCategoryCreateForm {
  closeModal?: () => void;
}
const Blog2SecondCategoryCreateForm = (
  props: IBlog2SecondCategoryCreateForm,
) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const searchParams = useSearchParams();
  const blog2Store = useBlog2Store();
  const fetchCSR = useFetchCSR();
  const {register, handleSubmit, formState, setError, getValues, setValue} =
    useForm<Blog2SecondCategoryCreateForm>({
      resolver: yupResolver(Blog2SecondCategoryCreateYup),
      mode: "onChange",
      defaultValues: {
        createSecondCategoryName: "",
        firstCategoryId: searchParams.get("firstCategoryId") ?? undefined,
        createSecondCategoryImageFile: undefined,
      },
    });

  // 2번쨰 카테고리 생성 API 요청 작업
  const createSecondCategoryHandler = async (
    data: Blog2SecondCategoryCreateForm,
  ) => {
    const formData = new FormData();
    formData.append("createSecondCategoryName", data.createSecondCategoryName);
    formData.append("firstCategoryId", data.firstCategoryId);
    formData.append(
      "createSecondCategoryImageFile",
      data.createSecondCategoryImageFile as File,
    );

    const result = await fetchCSR.requestWithHandler({
      url: "/api/blog2/category/second",
      method: "POST",
      formData: formData,
      showSuccessToast: true,
      handleRevalidateTags: ["blog2CategoryList"],
    });

    if (result == undefined) return;

    const temp = blog2Store.categoryList.map((i) => {
      if (i.id == +data.firstCategoryId) {
        i.blog2SecondCategoryList?.push(
          result.createBlog2SecondCategory,
        );
      }
      return i;
    });
    blog2Store.setBlog2CategoryList(temp);
    props.closeModal!();
  };

  // 이미지 업로드가 아닌 미리보기로 처리 후 API 요청할 때 업로드 처리 방식
  const fakeImageUpload = ({file, url}: {file: File; url: string}) => {
    setImageUrl(url);
    setValue("createSecondCategoryImageFile", file, {shouldValidate: true});
  };

  const {isDragging, onDragEnter, onDragLeave, onDragOver, onDropOrInputEvent} =
    useDragAndDropBlob({fakeImageUpload});

  return (
    <div className={"flex w-full flex-col gap-y-4"}>
      <div
        className={
          "flex h-[3rem] items-center justify-center primary-border primary-set"
        }
      >
        {blog2Store.categoryList.map(
          (el) =>
            el.id == Number(searchParams.get("firstCategoryId")) && el.name,
        )}
      </div>
      <ThemeInput1
        placeholder="2번째 카테고리 이름"
        register={register("createSecondCategoryName")}
        className="min-h-[3rem]"
      />
      <label
        className={`relative h-[16rem] w-full cursor-pointer primary-border-radius ${isDragging && "bg-primary-20"}`}
        htmlFor={"imageUpload"}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDropOrInputEvent}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="image"
            layout="fill"
            className="rounded-[1rem] object-contain" // object-cover vs object-contain
          />
        ) : (
          <div className="h-full w-full flex-col default-flex">
            <CiImageOn size={72} />
            <span> Drag and drop an image or click to upload </span>
          </div>
        )}
        <Input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onDropOrInputEvent}
        />
      </label>
      {/* TODO : 유효성 처리가 제대로 안되는 것 같다. */}
      <ThemeButton1
        onClick={handleSubmit(createSecondCategoryHandler)}
        disabled={!formState.isValid}
        className={"mt-[1rem] h-[3rem]"}
      >
        2번째 카테고리 추가하기
      </ThemeButton1>
    </div>
  );
};
export default Blog2SecondCategoryCreateForm;
