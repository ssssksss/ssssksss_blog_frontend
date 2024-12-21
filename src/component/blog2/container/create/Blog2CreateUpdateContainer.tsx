"use client";

import Blog2CreateUpdateHeader from "@component/blog2/hybrid/createUpdate/Blog2CreateUpdateHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import { Blog2CreateYup } from "@utils/validation/Blog2Yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useBlog2Store from "src/store/blog2Store";
import Blog2ContentBox from "../../hybrid/createUpdate/Blog2ContentBox";

interface IBlog2CreateContainer {
  categoryList: IBlog2FirstCategory[];
}
interface IBlog2UpdateContainer {
  data: ResBlog2Update;
  isEdit: boolean;
}

const Blog2CreateUpdateContainer = (props: IBlog2CreateContainer | IBlog2UpdateContainer) => {
  const blog2Store = useBlog2Store();
  const methods = useForm({
    mode: "onChange", 
    resolver: yupResolver(Blog2CreateYup),
    defaultValues: { 
      firstCategoryId: "isEdit" in props ? props.data.blog2.firstCategoryId : 0, 
      firstCategoryName: "isEdit" in props ? props.data.categoryList.filter(i=>i.id == props.data.blog2.firstCategoryId)[0].name : "", 
      secondCategoryId: "isEdit" in props ? props.data.blog2SecondCategory.id : 0, 
      secondCategoryName: "isEdit" in props ? props.data.blog2SecondCategory.name : "", 
      id: "isEdit" in props ? props.data.blog2.id : 0,
      title: "isEdit" in props ? props.data.blog2.title : "",
      description: "isEdit" in props ? props.data.blog2.description : "",
      thumbnailImageFile: undefined,
      thumbnailImageUrl: "isEdit" in props ? props.data.blog2.thumbnailImageUrl : "",
      blog2BasicList: "isEdit" in props ? props.data.blog2BasicList : [],
      blog2StructureList: "isEdit" in props ? props.data.blog2StructureList : [],
      blog2ResultList: "isEdit" in props ? props.data.blog2ResultList : [],
      isUpdateBlog2Header: false, // 블로그 헤더가 수정이 되었다면 수정이 되었다는 표시로 백엔드에 넘겨주는 용도
      isUpdateBlog2Basic: false,
      isUpdateBlog2Structure: false,
      isUpdateBlog2Result: false,
      deleteBlog2BasicList: [],
      deleteBlog2StructureList: [],
      deleteBlog2ResultList: [],
      blog2Status: "isEdit" in props ? props.data.blog2.blog2Status : "PUBLIC",
    }, 
  }); 

  useEffect(() => {
    blog2Store.setBlog2CategoryList("categoryList" in props ? props.categoryList : props.data.categoryList);
    if ("isEdit" in props) {
      blog2Store.setBlog2ActiveFirstCategoryId( 
        props.data.blog2.firstCategoryId,
      );
      blog2Store.setBlog2ActiveSecondCategoryId(
        props.data.blog2SecondCategory.id,
    
      );
    }
  }, []);
    
  return (
    <FormProvider {...methods} >f
      <Blog2CreateUpdateHeader isEdit={"isEdit" in props && props.isEdit} />
      <Blog2ContentBox isEdit={"isEdit" in props && props.isEdit} />
    </FormProvider>
  );
};
export default Blog2CreateUpdateContainer;