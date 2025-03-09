import Button from "@component/common/button/hybrid/Button";
import useToastifyStore from "@store/toastifyStore";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Blog2BasicContentBox from "./Blog2BasicContentBox";
import Blog2ResultBox from "./Blog2ResultBox";
import Blog2StructureContentBox from "./Blog2StructureContentBox";

interface IBlog2ContentBox {
  isEdit?: boolean;
}
const Blog2ContentBox = (props: IBlog2ContentBox) => {
  const [menu, setMenu] = useState("기초");
  const formContext = useFormContext();
  const toastifyStore = useToastifyStore();

  const addBlog2Content = (
    data: IBlog2BasicContent | IBlog2StructureContent,
    type: "basic" | "structure",
  ) => {
    if (type == "basic") {
      let isDuplicate = false;
      formContext.getValues("blog2BasicList").map((i: {
        id: number,
        blog2BasicContent: IBlog2BasicContent
      }) => {
        if (i.blog2BasicContent.id == data.id) {
          isDuplicate = true;
        }
      });
      if (isDuplicate) {
        toastifyStore.setToastify({
          type: "warning",
          message: "중복된 데이터 입니다.",
        });
        return;
      }
      formContext.setValue("blog2BasicList", [
        ...formContext.getValues("blog2BasicList"),
        {
          id: 0,
          position: 0,
          blog2BasicContent: data,
        },
      ]);
      formContext.setValue("isUpdateBlog2Basic", true);
    }

    if (type == "structure") {
      let isDuplicate = false;
      formContext.getValues("blog2StructureList").map((i: {
        id: number,
        blog2StructureContent: IBlog2StructureContent
      }) => {
        if (i.blog2StructureContent.id == data.id) {
          isDuplicate = true;
        }
      });
      if (isDuplicate) {
        toastifyStore.setToastify({
          type: "warning",
          message: "중복된 데이터 입니다.",
        });
        return;
      }
      formContext.setValue("blog2StructureList", [
        ...formContext.getValues("blog2StructureList"),
        {
          id: 0,
          position: 0,
          blog2StructureContent: data,
        },
      ]);
      formContext.setValue("isUpdateBlog2Structure", true);
    }
    
    toastifyStore.setToastify({
      type: "success",
      message: "추가",
    });
  };

  const updateBlog2Content = (
    data: IBlog2BasicContent | IBlog2StructureContent,
    type: "basic" | "structure",
  ) => {
    if (type == "basic") {
      // id값이 일치하는 부분만 덜어낸다.
      const updatedList = formContext
        .getValues("blog2BasicList") // 기존 리스트 가져오기
        .map(
          (item: IBlog2Basic) =>
            item.blog2BasicContent.id == data.id // id가 일치하는 항목 찾기
              ? {...item, blog2BasicContent: data} // 일치하면 해당 항목 업데이트
              : item, // 일치하지 않으면 기존 항목 유지
        );
      // 수정된 리스트를 다시 설정
      formContext.setValue("blog2BasicList", updatedList);
    }

    if (type == "structure") {
      const updatedList = formContext
        .getValues("blog2StructureList")
        .map((item: IBlog2Structure) =>
          item.blog2StructureContent.id == data.id
            ? {...item, blog2StructureContent: data}
            : item,
        );
      // 수정된 리스트를 다시 설정
      formContext.setValue("blog2StructureList", updatedList);
    }
  
    toastifyStore.setToastify({
      type: "success",
      message: "수정 완료",
    });
  };

  const removeBlog2Content = (
    type: "basic" | "structure",
    id: number,
  ) => {
    if (type == "basic") {
      const temp = (
        formContext.getValues("blog2BasicList") as IBlog2Basic[]
      ).filter((i) => i.blog2BasicContent.id != id);
      formContext.setValue("blog2BasicList", [...temp]);
      if (props.isEdit) {
        formContext.setValue("isUpdateBlog2Basic", true);
        formContext.setValue("deleteBlog2BasicList", [
          ...formContext.getValues("deleteBlog2BasicList"),
          id,
        ]);
      }
    }
    if (type == "structure") {
      const temp = (
            formContext.getValues(
              "blog2StructureList",
            ) as IBlog2Structure[]
      ).filter((i) => i.blog2StructureContent.id != id);
      formContext.setValue("blog2StructureList", [...temp]);
      if (props.isEdit) {
        formContext.setValue("isUpdateBlog2Structure", true);
        formContext.setValue("deleteBlog2StructureList", [
          ...formContext.getValues("deleteBlog2StructureList"),
          id,
        ]);
      }
      return {
        type: "error",
        message: "제거 성공",
      };
    }
    toastifyStore.setToastify({
      type: "success",
      message: "임시 제거",
    });
  };

  return (
    <section className={"flex h-full w-full flex-col gap-y-2 mt-[.5rem]"}>
      <div
        className={
          "flex h-[2.75rem] min-h-[2.75rem] w-full primary-border-radius"
        }
      >
        {[
          {
            menu: "기초",
            name: "blog2BasicList",
          },
          {
            menu: "구조",
            name: "blog2StructureList",
          },
          {
            menu: "결과",
            name: "blog2ResultList",
          },
        ]
          .filter((i) => i.menu != "결과" || (i.menu == "결과" && props.isEdit))
          .map((i) => (
            <Button
              key={i.name}
              onClick={() => setMenu(i.menu)}
              className={`flex h-auto w-full gap-x-2 rounded-2xl default-flex ${menu == i.menu && "animate-rotateFadeIn bg-primary-60"}`}
            >
              <p
                className={`${menu == i.menu ? "text-white-80" : "text-black-80"}`}
              >
                {i.menu}
              </p>
              <p
                className={`${menu == i.menu ? "text-white-80" : "text-black-40"}`}
              >
                {formContext.getValues(i.name)?.length || 0}
              </p>
            </Button>
          ))}
      </div>
      <div className={"flex h-full w-full p-2 primary-border-radius"}>
        {menu == "기초" && (
          <Blog2BasicContentBox
            addBlog2Content={addBlog2Content}
            updateBlog2Content={updateBlog2Content}
            removeBlog2Content={removeBlog2Content}
          />
        )}
        {menu == "구조" && (
          <Blog2StructureContentBox
            addBlog2Content={addBlog2Content}
            updateBlog2Content={updateBlog2Content}
            removeBlog2Content={removeBlog2Content}
          />
        )}
        {menu == "결과" && <Blog2ResultBox />}
      </div>
    </section>
  );
};
export default Blog2ContentBox;
