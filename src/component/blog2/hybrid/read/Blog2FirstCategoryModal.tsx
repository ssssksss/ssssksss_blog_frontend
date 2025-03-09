import ThemeButton1 from "@component/common/button/ThemeButton1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { useState } from "react";
import useBlog2Store from "src/store/blog2Store";
import Blog2FirstCategoryCreateForm from "./Blog2FirstCategoryCreateForm";

// TODO : 블로그 카테고리 수정 및 삭제 추가 필요
const buttons = [
  { label: "추가", value: "add" },
  // { label: "수정", value: "update" },
  // { label: "삭제", value: "delete" },
];

const Blog2FirstCategoryModal = (props: IModalComponent) => {
  const [menu, setMenu] = useState("add");
  const blogCategoryStore = useBlog2Store();

  return (
    <ModalTemplate className="max-h-[40rem] w-[calc(100vw-2rem)] max-w-[33.5rem]">
      {props.closeButtonComponent}
      {/* TODO : 수정과 삭제 기능 추가 필요 */}
      <div className="flex w-full gap-4">
        {buttons.map((btn) => (
          <ThemeButton1
            key={btn.value}
            className={`h-[3rem] w-full ${
              menu === btn.value &&
              "text-lg font-bold primary-set hover:bg-primary-20"
            } primary-border-radius`}
            onClick={() => setMenu(btn.value)}
          >
            {btn.label}
          </ThemeButton1>
        ))}
      </div>
      <div className="mt-[1rem] w-full">
        {menu == "add" && <Blog2FirstCategoryCreateForm />}
      </div>
    </ModalTemplate>
  );
};
export default Blog2FirstCategoryModal;