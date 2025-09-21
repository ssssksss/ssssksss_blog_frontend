import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import Dropdown from "@component/common/dropdown/Dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetchCSR from "@hooks/useFetchCSR";
import { Blog2SecondCategoryDeleteYup } from "@utils/validation/BlogCategoryYup";
import { AWSS3Prefix } from "@utils/variables/s3url";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";
import useBlog2Store from "src/store/blog2Store";

interface IBlog2SecondCategoryDeleteForm {
  closeModal: () => void;
}
const Blog2SecondCategoryDeleteForm = (
  props: IBlog2SecondCategoryDeleteForm,
) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const searchParams = useSearchParams();
  const blog2Store = useBlog2Store();
  const router = useRouter();
  const fetchCSR = useFetchCSR();

  const {register, handleSubmit, formState, watch, getValues, setValue} =
    useForm<Blog2SecondCategoryDeleteForm>({
      resolver: yupResolver(Blog2SecondCategoryDeleteYup),
      mode: "onChange",
      defaultValues: {
        deleteSecondCategoryId: 0,
      },
    });


  const deleteSecondCategoryHandler = async () => {

    await fetchCSR.requestWithHandler({
      url: `/api/blog2/category/second?deleteSecondCategoryId=${getValues("deleteSecondCategoryId")}`,
      method: "DELETE",
      handleRevalidateTags: ["blog2CategoryList"],
      showSuccessToast: true,
      handleSuccess: () => {
        // 카테고리2 리스트에서 삭제한 카테고리2 id를 찾아서 제거
        try {
          const temp = blog2Store.categoryList.map((i) => {
            if (i.id == +searchParams.get("firstCategoryId")!) {
              i.blog2SecondCategoryList = i.blog2SecondCategoryList?.filter(
                (j) => j.id != getValues("deleteSecondCategoryId"),
              );
            }
            return i;
          });
          blog2Store.setBlog2CategoryList(temp);
          // 만일 삭제한 카테고리2가 현재 화면에 보이는 카테고리와 동일하다면 보이지 않게 처리한다.
          if (
            +searchParams.get("secondCategoryId")! ==
            getValues("deleteSecondCategoryId")
          ) {
            // 모달창이 열린 상태에서 router를 이용할 경우에는 아래와 같이 처리
            if (history.state.isModal) {
              router.back();
              router.replace(
                `/blog2?firstCategoryId=${+searchParams.get("firstCategoryId")!}`,
              );
            }
          }
        } finally {
          props.closeModal()!;
        }
      },
      handleFail: () => {
        return;
      }
    });

    
  };

  const dropdownHandler = (id: number) => {
    blog2Store.categoryList
      .filter((i) => i.id + "" == searchParams.get("firstCategoryId"))[0]
      .blog2SecondCategoryList?.forEach((j) => {
        if (j.id == id) {
          setImageUrl(AWSS3Prefix + "" + j.thumbnailImageUrl);
          setValue("deleteSecondCategoryId", id, {shouldValidate: true});
        }
      });
  };

  return (
    <div className={"flex w-full flex-col gap-y-4"}>
      <div
        className={
          "flex h-[3rem] items-center justify-center primary-border primary-set rounded-2xl"
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
        OptionContainerMaxH="max-h-[22rem]"
      />
      <label
        className={"relative z-50 h-[16rem] w-full primary-border-radius"}
        htmlFor={"imageUpload"}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={"image"}
            layout="fill"
            className="rounded-[1rem] object-contain p-1"
          />
        ) : (
          <div className="h-full w-full flex-col default-flex">
            <CiImageOn size={72} />
            <span> 카테고리를 선택하세요 </span>
          </div>
        )}
      </label>
      {/* TODO : confirm 버튼으로 변경 필요 */}
      <ThemeActiveButton1
        onClick={handleSubmit(deleteSecondCategoryHandler)}
        disabled={!formState.isValid}
        className={"h-[3rem] rounded-2xl"}
        isActive={formState.isValid}
      >
        삭제
      </ThemeActiveButton1>
    </div>
  );
};
export default Blog2SecondCategoryDeleteForm;
