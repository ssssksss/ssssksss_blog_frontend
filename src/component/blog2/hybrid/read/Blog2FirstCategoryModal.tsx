import Button from "@component/common/button/hybrid/Button";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { useState } from "react";
import useBlog2Store from "src/store/blog2Store";
import Blog2FirstCategoryCreateForm from "./Blog2FirstCategoryCreateForm";

const buttons = [
  { label: "추가", value: "add" },
  { label: "수정", value: "update" },
  { label: "삭제", value: "delete" },
];

const Blog2FirstCategoryModal = (props: IModalComponent) => {
  const [menu, setMenu] = useState("add");
  const blogCategoryStore = useBlog2Store();

  return (
    <ModalTemplate className="w-[calc(100vw-2rem)] max-w-[37.5rem] max-h-[40rem]">
      {props.closeButtonComponent}
      {/* <div
        className={
          "w-[calc(100vw-2rem)] max-w-[37.5rem] max-h-[40rem] h-full flex flex-col bg-red-20 rounded-b-[1rem] pt-[3rem] px-[2.75rem]"
        }
      > */}
      <div className="flex gap-4 w-full">
        {buttons.map((btn) => (
          <Button
            key={btn.value}
            className={`w-full h-[3rem] ${
              menu === btn.value &&
            "bg-primary-20 text-black-80 font-bold text-lg"
            } outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 rounded-[1rem]`}
            onClick={() => setMenu(btn.value)}
          >
            {btn.label}
          </Button>
        ))}
      </div>
      <div className="mt-[1rem] w-full">
        {
          menu == "add" && <Blog2FirstCategoryCreateForm />
        }
      </div>
      {/* </div> */}
    </ModalTemplate>
  );
};
export default Blog2FirstCategoryModal;