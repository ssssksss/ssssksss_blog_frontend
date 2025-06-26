import ThemeButton1 from "@component/common/button/ThemeButton1";
import Dropdown from "@component/common/dropdown/Dropdown";
import Input from "@component/common/input/Input";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDragAndDropBlob } from "@hooks/useDragAndDropBlob";
import useFetchCSR from "@hooks/useFetchCSR";
import { Blog2SecondCategoryUpdateYup } from "@utils/validation/BlogCategoryYup";
import { AWSS3Prefix } from "@utils/variables/s3url";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
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
          setValue("updateSecondCategoryName", "");
          setValue("id", j.id, {shouldValidate: true});
          setUpdateCategoryName(j.name);
        }
      });
  };

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
