import ThemeButton1 from "@component/common/button/ThemeButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import { yupResolver } from "@hookform/resolvers/yup";
import useBlog2Store from "@store/blog2Store";
import { Blog2FirstCategoryCreateYup } from "@utils/validation/BlogCategoryYup";
import { useForm } from "react-hook-form";

interface IBlog2FirstCategoryCreateForm {

}
const Blog2FirstCategoryCreateForm = (props: IBlog2FirstCategoryCreateForm) => {

  const blog2Store = useBlog2Store();
  // const {fetchCSR} = useFetchCSRHandler();
  const { register, handleSubmit, formState, setError } = useForm({
    resolver: yupResolver(Blog2FirstCategoryCreateYup),
    mode: "onChange",
    defaultValues: {
      createFirstCategoryName: "",
    },
  });

  const createFirstCategoryHandler = async (data: { createFirstCategoryName: string }) => {
    const response = await fetch("/api/blog2/first/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        name: data.createFirstCategoryName,
      }),
    });

    if (!response.ok) {
      return;
    }
    const result: responseCreateBlog2FirstCategory = await response.json();
    result.data.blog2SecondCategoryList = [];
    blog2Store.setBlog2CategoryList(
      [...blog2Store.categoryList, result.data]
    );
  };

  return (
    <div className={"flex w-full flex-col py-4"}>
      <ThemeInput1
        placeholder="이름"
        register={register("createFirstCategoryName")}
      />
      <ThemeButton1
        onClick={handleSubmit(createFirstCategoryHandler)}
        disabled={!formState.isValid}
        className={
          "mt-[1rem] h-[3rem]"
        }
      >
        카테고리 1 추가하기
      </ThemeButton1>
    </div>
  );
};
export default Blog2FirstCategoryCreateForm;