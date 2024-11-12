import Button from "@component/common/button/hybrid/Button";
import Input from "@component/common/input/Input";
import {yupResolver} from "@hookform/resolvers/yup";
import useBlog2Store from "@store/blog2Store";
import {Blog2FirstCategoryCreateYup} from "@utils/validation/BlogCategoryYup";
import {useForm} from "react-hook-form";

interface IBlog2FirstCategoryUpdateForm {}
const Blog2FirstCategoryUpdateForm = (props: IBlog2FirstCategoryUpdateForm) => {
  const blog2Store = useBlog2Store();
  // const {fetchCSR} = useFetchCSRHandler();
  const {register, handleSubmit, formState, setError} = useForm({
    resolver: yupResolver(Blog2FirstCategoryCreateYup),
    mode: "onChange",
    defaultValues: {
      createFirstCategoryName: "",
    },
  });

  const createFirstCategoryHandler = async (data: {
    createFirstCategoryName: string;
  }) => {
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
    blog2Store.setBlog2CategoryList([...blog2Store.categoryList, result.data]);
  };

  return (
    <div className={"flex w-full flex-col py-4"}>
      <Input
        placeholder="이름"
        register={register("createFirstCategoryName")}
      />
      <Button
        onClick={handleSubmit(createFirstCategoryHandler)}
        disabled={!formState.isValid}
        className={
          "mt-[1rem] h-[3rem] rounded-[1rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 hover:bg-primary-20"
        }>
        추가
      </Button>
    </div>
  );
};
export default Blog2FirstCategoryUpdateForm;
