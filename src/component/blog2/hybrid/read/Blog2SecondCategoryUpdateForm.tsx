import Button from "@component/common/button/hybrid/Button";
import Dropdown from "@component/common/dropdown/Dropdown";
import Input from "@component/common/input/Input";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDragAndDropBlob} from "@hooks/useDragAndDropBlob";
import {Blog2SecondCategoryUpdateYup} from "@utils/validation/BlogCategoryYup";
import {AWSS3Prefix} from "@utils/variables/s3url";
import Image from "next/image";
import {useSearchParams} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import useBlog2Store from "src/store/blog2Store";
import useToastifyStore from "src/store/toastifyStore";

interface IBlog2SecondCategoryUpdateForm {
  closeModal: () => void;
}
const Blog2SecondCategoryUpdateForm = (
  props: IBlog2SecondCategoryUpdateForm,
) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const searchParams = useSearchParams();
  const blog2Store = useBlog2Store();
  const toastifyStore = useToastifyStore();
  const [updateCategoryName, setUpdateCategoryName] = useState("");

  const {register, handleSubmit, formState, watch, getValues, setValue} =
    useForm<Blog2SecondCategoryUpdateForm>({
      resolver: yupResolver(Blog2SecondCategoryUpdateYup),
      mode: "onChange",
      defaultValues: {
        id: 0,
        updateSecondCategoryName: "",
        updateSecondCategoryImageFile: undefined,
      },
    });

  const updateSecondCategoryHandler = async (
    data: Blog2SecondCategoryUpdateForm,
  ) => {
    const formData = new FormData();
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

    const response = await fetch("/api/blog2/second/category", {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      const result: responseUpdateBlog2SecondCategory = await response.json();
      const temp = blog2Store.categoryList.map((i) => {
        if (i.id == +searchParams.get("firstCategoryId")!) {
          i.blog2SecondCategoryList?.map((j) => {
            if (j.id == result.data.id) {
              j.name = result.data.name;
              j.thumbnailImageUrl = result.data.thumbnailImageUrl;
            }
          });
        }
        return i;
      });
      toastifyStore.setToastify({
        type: "success",
        message: "2번째 카테고리를 수정했습니다.",
      });
      blog2Store.setBlog2CategoryList(temp);
      props.closeModal && props.closeModal();
    }
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
          setValue("updateSecondCategoryName", "");
          setValue("id", j.id, {shouldValidate: true});
          setUpdateCategoryName(j.name);
        }
      });
  };

  return (
    <div className={"flex w-full flex-col gap-y-4"}>
      <div
        className={"flex h-[3rem] items-center justify-center default-outline"}>
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
        containerClassName="min-h-[3rem]"
      />
      <Input
        placeholder="변경할 2번째 카테고리 이름"
        className="min-h-[3rem]"
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
        className={`relative z-50 h-[16rem] w-full rounded-2xl default-outline ${imageUrl && "cursor-pointer"}`}
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
            className="rounded-[1rem] p-1"
          />
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
      <Button
        onClick={handleSubmit(updateSecondCategoryHandler)}
        disabled={!formState.isValid}
        className={
          "h-[3rem] default-outline hover:bg-primary-20 disabled:bg-gray-60"
        }>
        추가
      </Button>
    </div>
  );
};
export default Blog2SecondCategoryUpdateForm;
