import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import useToastifyStore from "@store/toastifyStore";
import React, { useCallback, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Blog2BasicContentContainer from "../basic/Blog2BasicContentContainer";
import Blog2ResultBox from "../Blog2ResultBox";
import Blog2StructureContentBox from "../structure/Blog2StructureContentBox";

interface IBlog2CreateUpdateBody {
  isEdit?: boolean;
}

// 블로그 기초,구조,결과 섹션의 내용이 있는 컴포넌트
const Blog2CreateUpdateBody = ({isEdit}: IBlog2CreateUpdateBody) => {
  const [menu, setMenu] = useState("기초");
  const formContext = useFormContext();
  const toastifyStore = useToastifyStore();

  const checkDuplicate = (
    list: any[],
    id: number,
    type: "blog2BasicContent" | "blog2StructureContent",
  ) => list.some((item) => item[type].id === id);

  const addBlog2Content = useCallback((data: any, type: "basic" | "structure") => {
    const listName = type === "basic" ? "blog2BasicList" : "blog2StructureList";
    const contentKey =
      type === "basic" ? "blog2BasicContent" : "blog2StructureContent";
    
    if (checkDuplicate(formContext.getValues(listName), data.id, contentKey)) {
      toastifyStore.setToastify({
        type: "warning",
        message: "중복된 데이터 입니다.",
      });
      return;
    }

    formContext.setValue(listName, [
      ...formContext.getValues(listName),
      {id: 0, position: 0, [contentKey]: data},
    ]);
    formContext.setValue(
      `isUpdate${listName.charAt(0).toUpperCase() + listName.slice(1)}`,
      true,
    );
    toastifyStore.setToastify({type: "success", message: "추가"});
  },[]);

  const updateBlog2Content = useCallback((data: any, type: "basic" | "structure") => {
    const listName = type === "basic" ? "blog2BasicList" : "blog2StructureList";
    const contentKey =
      type === "basic" ? "blog2BasicContent" : "blog2StructureContent";
    const deleteListName = `delete${listName.charAt(0).toUpperCase() + listName.slice(1)}`;
    const updatedList = formContext
      .getValues(listName)
      .map((item: any) =>
        item[contentKey].id === data.id ? {...item, [contentKey]: data} : item,
      );

    formContext.setValue(listName, updatedList);
    const deleteList: number[] = formContext.getValues(deleteListName);

    if (deleteList.includes(data.id)) {
      // 기존에 있던 항목을 제외했다가 다시 추가한 경우를 대비한 코드
      const _deletedList = deleteList.filter((i) => i !== data.id);
      formContext.setValue(deleteListName, _deletedList);
    }
    toastifyStore.setToastify({type: "success", message: "수정 완료"});
  },[]);

  const removeBlog2Content = useCallback((type: "basic" | "structure", id: number) => {
    const listName = type === "basic" ? "blog2BasicList" : "blog2StructureList";
    const deleteListName = `delete${listName.charAt(0).toUpperCase() + listName.slice(1)}`;

    formContext.setValue(
      listName,
      formContext
        .getValues(listName)
        ?.filter((i: any) => i.blog2BasicContent.id !== id),
    );

    if (isEdit) {
      // 수정을 할 필요가 있다는 의미
      formContext.setValue(
        `isUpdate${listName.charAt(0).toUpperCase() + listName.slice(1)}`,
        true,
      );
      // 목록에서 제거된 리스트를 추가
      formContext.setValue(deleteListName, [
        ...formContext.getValues(deleteListName),
        id,
      ]);
    }
    toastifyStore.setToastify({type: "success", message: "목록에서 제거 완료"});
  }, []);
  
  const Blog2ContentCount = ({name}: {name: string}) => {
    const {control} = useFormContext();
    const list = useWatch({name, control});

    return <span>{list?.length || 0}</span>;
  };

  const blog2SectionList = [
    {menu: "기초", name: "blog2BasicList"},
    {menu: "구조", name: "blog2StructureList"},
    {menu: "결과", name: "blog2ResultList"},
  ].filter((i) => i.menu !== "결과" || isEdit);

  return (
    <section className="mt-[.5rem] flex h-full w-full flex-col gap-y-2">
      <div className="flex h-[2.75rem] min-h-[2.75rem] w-full gap-x-2">
        {blog2SectionList.map((i) => (
          <ThemeActiveButton1
            key={i.name}
            isActive={menu === i.menu}
            className={`flex h-auto w-full gap-x-2 default-flex ${menu === i.menu && "animate-rotateFadeIn"}`}
            onClick={() => setMenu(i.menu)}
          >
            <span>{i.menu}</span>
            <span>
              <Blog2ContentCount name={i.name} />
            </span>
          </ThemeActiveButton1>
        ))}
      </div>
      <div className="flex h-full w-full p-2 primary-border-radius">
        {menu === "기초" && (
          <Blog2BasicContentContainer
            {...{addBlog2Content, updateBlog2Content, removeBlog2Content}}
          />
        )}
        {menu === "구조" && (
          <Blog2StructureContentBox
            {...{addBlog2Content, updateBlog2Content, removeBlog2Content}}
          />
        )}
        {menu === "결과" && <Blog2ResultBox />}
      </div>
    </section>
  );
};

export default React.memo(Blog2CreateUpdateBody);
