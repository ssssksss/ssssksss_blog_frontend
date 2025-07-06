"use client";

import ThemeButton1 from "@component/common/button/ThemeButton1";
import Dropdown from "@component/common/dropdown/Dropdown";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import useBlog2Store from "@store/blog2Store";
import { EditorCreateUpdateTitleStyle } from "@utils/editor/EditorTailwindcssStyle";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface IBlog2BasicCreateUpdateCategoryAndTitleForm {
  formContext: UseFormReturn<IBlog2BasicFormContext>;
  isEdit?: boolean;
  blog2BasicContentItem?: IBlog2BasicContent;
  changeContentUsingTemplate: (value: string) => void;
}

const Blog2BasicCreateUpdateCategoryAndTitleForm = (
  props: IBlog2BasicCreateUpdateCategoryAndTitleForm,
) => {
  const [secondCategoryList, setSecondCategoryList] = useState<
    IBlog2SecondCategoryList[]
    >([]);
  const blog2CategoryList = useBlog2Store(
    (state) => state.categoryList,
  );
  const blog2ChoiceSecondCategory = useBlog2Store(
    (state) => state.blog2ChoiceSecondCategory,
  );
  const setBlog2ChoiceSecondCategory = useBlog2Store(
    (state) => state.setBlog2ChoiceSecondCategory,
  );

  const handleClickFirstCategory = (value: number) => {
    props.formContext.setValue("firstCategoryId", value);
    blog2CategoryList.map((i) => {
      if (i.id == value) {
        setSecondCategoryList([]);
        if (i.blog2SecondCategoryList?.length) {
          setSecondCategoryList(i.blog2SecondCategoryList);
          handleClickSecondCategory(i.blog2SecondCategoryList[0].id);
        }
      }
    });
  };

  const handleClickSecondCategory = (value: number) => {
    props.formContext.setValue("secondCategoryId", value, {
      shouldValidate: true,
    });
    blog2CategoryList.map(i => {
      if (i.id == props.formContext.getValues("firstCategoryId")) {
        i.blog2SecondCategoryList?.map(j => {
          if (j.id == value) {
            setBlog2ChoiceSecondCategory({
              id: j.id,
              name: j.name,
              templateContent: j.templateContent,
            }); 
          }
        });
      }
    });
    props.formContext.watch();
  };

  useEffect(() => {
    if (!props.isEdit) return;

    const firstCategory = blog2CategoryList.find(
      (i) => i.id === props.blog2BasicContentItem!.blog2FirstCategoryId,
    );

    setSecondCategoryList(firstCategory?.blog2SecondCategoryList ?? []);
  }, []);

  return (
    <div className="absolute left-[1rem] top-[7.325rem] z-10 flex w-[calc(100%-2rem)] grid-rows-3 flex-col gap-y-2 bg-default-1 p-4 primary-border">
      <Dropdown
        options={blog2CategoryList.map((i) => ({
          value: i.id,
          name: i.name,
        }))}
        defaultValue={props.blog2BasicContentItem?.blog2FirstCategoryId || 0}
        value={props.formContext.getValues("firstCategoryId") || 0}
        dropdownHandler={handleClickFirstCategory}
        placeholder={"카테고리1"}
        containerClassName={"min-h-12 bg-default-1 rounded-2xl"}
      />
      <Dropdown
        options={
          blog2CategoryList
            .find(
              (i) => i.id === props.formContext.getValues("firstCategoryId"),
            )
            ?.blog2SecondCategoryList?.map((i) => ({
              value: i.id,
              name: i.name,
            })) || []
        }
        defaultValue={props.blog2BasicContentItem?.blog2SecondCategoryId || 0}
        value={props.formContext.getValues("secondCategoryId") || 0}
        dropdownHandler={handleClickSecondCategory}
        placeholder={"카테고리2"}
        disabled={
          !props.formContext.getValues("firstCategoryId") ||
          blog2CategoryList.length < 1
        }
        containerClassName={"min-h-12 bg-default-1 rounded-2xl"}
      />
      <ThemeInput1
        type={"text"}
        register={props.formContext.register("title")}
        className={EditorCreateUpdateTitleStyle}
        placeholder="제목"
      />
      <ThemeButton1
        className="h-12"
        onClick={() =>
          props.changeContentUsingTemplate(
            blog2ChoiceSecondCategory.templateContent,
          )
        }
        disabled={!blog2ChoiceSecondCategory.templateContent}
      >
        템플릿 적용(현재 내용은 전부 제거)
      </ThemeButton1>
    </div>
  );
};

export default Blog2BasicCreateUpdateCategoryAndTitleForm;
