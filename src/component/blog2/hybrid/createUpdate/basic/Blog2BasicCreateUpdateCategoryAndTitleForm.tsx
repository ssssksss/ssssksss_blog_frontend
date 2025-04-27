"use client";

import Dropdown from "@component/common/dropdown/Dropdown";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import useBlog2Store from "@store/blog2Store";
import { EditorCreateUpdateTitleStyle } from "@utils/editor/EditorTailwindcssStyle";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface IFormContext {
  title: string;
  content: string;
  firstCategoryId: number;
  secondCategoryId: number;
  blobImageList: {url: string; file: File}[];
  deleteImageBucketDirectory?: string[];
}

interface IBlog2BasicCreateUpdateCategoryAndTitleForm {
  formContext: UseFormReturn<IFormContext>;
  isEdit?: boolean;
  blog2BasicContentItem?: IBlog2BasicContent;
}

const Blog2BasicCreateUpdateCategoryAndTitleForm = (
  props: IBlog2BasicCreateUpdateCategoryAndTitleForm,
) => {
  const blog2Store = useBlog2Store();
  const [secondCategoryList, setSecondCategoryList] = useState<
    IBlog2SecondCategoryList[]
  >([]);

  const handleClickFirstCategory = (value: number) => {
    props.formContext.setValue("firstCategoryId", value);
    blog2Store.categoryList.map((i) => {
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
    props.formContext.watch();
  };

  useEffect(() => {
    if (!props.isEdit) return;

    const firstCategory = blog2Store.categoryList.find(
      (i) => i.id === props.blog2BasicContentItem!.blog2FirstCategoryId,
    );

    setSecondCategoryList(firstCategory?.blog2SecondCategoryList ?? []);
  }, []);

  return (
    <div className="absolute left-[1rem] top-[7.325rem] z-10 flex w-[calc(100%-2rem)] grid-rows-3 flex-col gap-y-2 bg-default-1 p-4 primary-border">
      <Dropdown
        options={blog2Store.categoryList.map((i) => ({
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
          blog2Store.categoryList
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
          blog2Store.categoryList.length < 1
        }
        containerClassName={"min-h-12 bg-default-1 rounded-2xl"}
      />
      <ThemeInput1
        type={"text"}
        register={props.formContext.register("title")}
        className={EditorCreateUpdateTitleStyle}
        placeholder="제목"
      />
    </div>
  );
};

export default Blog2BasicCreateUpdateCategoryAndTitleForm;
