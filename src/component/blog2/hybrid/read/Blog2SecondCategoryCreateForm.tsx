import Button from "@component/common/button/hybrid/Button";
import Input from "@component/common/input/Input";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDragAndDropBlob} from "@hooks/useDragAndDropBlob";
import {Blog2SecondCategoryCreateYup} from "@utils/validation/BlogCategoryYup";
import Image from "next/image";
import {useSearchParams} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import useBlog2Store from "src/store/blog2Store";
import useToastifyStore from "src/store/toastifyStore";

interface IBlog2SecondCategoryCreateForm {
  closeModal?: () => void;
}
const Blog2SecondCategoryCreateForm = (
  props: IBlog2SecondCategoryCreateForm,
) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const searchParams = useSearchParams();
  const blog2Store = useBlog2Store();
  const toastifyStore = useToastifyStore();
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

    const response = await fetch("/api/blog2/second/category", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result: responseCreateBlog2SecondCategory = await response.json();
      const temp = blog2Store.categoryList.map((i) => {
        if (i.id == +data.firstCategoryId) {
          i.blog2SecondCategoryList?.push(
            result.data.createBlog2SecondCategory,
          );
        }
        return i;
      });
      toastifyStore.setToastify({
        type: "success",
        message: "2번째 카테고리를 생성했습니다.",
      });
      blog2Store.setBlog2CategoryList(temp);
      props.closeModal && props.closeModal();
    }
  };

  const fakeImageUpload = ({file, url}: {file: File; url: string}) => {
    setImageUrl(url);
    setValue("createSecondCategoryImageFile", file, {shouldValidate: true});
  };

  const {isDragging, onDragEnter, onDragLeave, onDragOver, onDropOrInputEvent} =
    useDragAndDropBlob({fakeImageUpload});

  return (
    <div className={"flex w-full flex-col gap-y-4"}>
      <div
        className={"flex h-[3rem] items-center justify-center default-outline"}>
        {blog2Store.categoryList.map(
          (el) =>
            el.id == Number(searchParams.get("firstCategoryId")) && el.name,
        )}
      </div>
      <Input
        placeholder="2번째 카테고리 이름"
        register={register("createSecondCategoryName")}
        className="min-h-[3rem]"
      />
      <label
        className={"relative h-[16rem] w-full cursor-pointer default-outline"}
        htmlFor={"imageUpload"}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDropOrInputEvent}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={"image"}
            layout="fill"
            className="rounded-[1rem]"
          />
        )}
        <Input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onDropOrInputEvent}
        />
      </label>
      <Button
        onClick={handleSubmit(createSecondCategoryHandler)}
        disabled={!formState.isValid}
        className={
          "h-[3rem] default-outline hover:bg-primary-20 disabled:bg-gray-60"
        }>
        추가
      </Button>
    </div>
  );
};
export default Blog2SecondCategoryCreateForm;
