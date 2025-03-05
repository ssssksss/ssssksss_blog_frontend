import Button from "@component/common/button/hybrid/Button";
import Dropdown from "@component/common/dropdown/Dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { Blog2SecondCategoryDeleteYup } from "@utils/validation/BlogCategoryYup";
import { AWSS3Prefix } from "@utils/variables/s3url";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useBlog2Store from "src/store/blog2Store";
import useToastifyStore from "src/store/toastifyStore";

interface IBlog2SecondCategoryDeleteForm {
  closeModal: () => void;
}
const Blog2SecondCategoryDeleteForm = (
  props: IBlog2SecondCategoryDeleteForm,
) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const searchParams = useSearchParams();
  const blog2Store = useBlog2Store();
  const toastifyStore = useToastifyStore();
  const router = useRouter();

  const {register, handleSubmit, formState, watch, getValues, setValue} =
    useForm<Blog2SecondCategoryDeleteForm>({
      resolver: yupResolver(Blog2SecondCategoryDeleteYup),
      mode: "onChange",
      defaultValues: {
        deleteSecondCategoryId: 0,
      },
    });


  const deleteSecondCategoryHandler = async () => {

    const response = await fetch(`/api/blog2/second/category?deleteSecondCategoryId=${getValues("deleteSecondCategoryId")}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // 카테고리2 리스트에서 삭제한 카테고리2 id를 찾아서 제거
      const temp = blog2Store.categoryList.map((i) => {
        if (i.id == +searchParams.get("firstCategoryId")!) {
          i.blog2SecondCategoryList = i.blog2SecondCategoryList?.filter(
            (j) => j.id != getValues("deleteSecondCategoryId"),
          );
        }
        return i;
      });
      toastifyStore.setToastify({
        type: "success",
        message: "2번째 카테고리를 삭제했습니다.",
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
      props.closeModal()!;
    } else {
      toastifyStore.setToastify({
        type: "error",
        message: "2번째 카테고리를 삭제 실패",
      });
    }
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
          "flex h-[3rem] items-center justify-center primary-outline primary-set"
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
        containerClassName="min-h-[3rem]"
        OptionContainerMaxH="max-h-[22rem]"
      />
      <label
        className={"relative z-50 h-[16rem] w-full primary-outline"}
        htmlFor={"imageUpload"}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={"image"}
            layout="fill"
            className="rounded-[1rem] p-1"
          />
        )}
      </label>
      {/* TODO : confirm 버튼으로 변경 필요 */}
      <Button
        onClick={handleSubmit(deleteSecondCategoryHandler)}
        disabled={!formState.isValid}
        className={
          "h-[3rem] rounded-2xl primary-outline primary-set hover:bg-primary-20 disabled:bg-gray-60"
        }
      >
        삭제
      </Button>
    </div>
  );
};
export default Blog2SecondCategoryDeleteForm;
