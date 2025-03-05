import Button from "@component/common/button/hybrid/Button";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { useState } from "react";
import Blog2SecondCategoryCreateForm from "./Blog2SecondCategoryCreateForm";
import Blog2SecondCategoryDeleteForm from "./Blog2SecondCategoryDeleteForm";
import Blog2SecondCategoryUpdateForm from "./Blog2SecondCategoryUpdateForm";

interface IBlog2SecondCategoryModal extends IModalComponent {}

const buttons = [
  {label: "추가", value: "add"},
  {label: "수정", value: "update"},
  {label: "삭제", value: "delete"},
];

const Blog2SecondCategoryModal = (props: IBlog2SecondCategoryModal) => {
  const [menu, setMenu] = useState("add");

  return (
    <ModalTemplate
      className={
        "flex w-[calc(100vw-2rem)] max-w-[33.5rem] flex-col overflow-y-scroll rounded-b-[1rem] bg-default-1 px-[2.75rem] pb-8 pt-[3rem]"
      }
    >
      {props.closeButtonComponent}
      <div className="flex w-full gap-4">
        {buttons.map((btn) => (
          <Button
            key={btn.value}
            className={`h-[3rem] w-full ${
              menu === btn.value &&
              "primary-set text-lg font-bold text-black-80"
            } rounded-[1rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] primary-outline`}
            onClick={() => setMenu(btn.value)}
          >
            {btn.label}
          </Button>
        ))}
      </div>
      <div className="mt-[1rem] w-full">
        {menu == "add" && (
          <Blog2SecondCategoryCreateForm closeModal={props.closeModal} />
        )}
        {menu == "update" && (
          <Blog2SecondCategoryUpdateForm closeModal={props.closeModal!} />
        )}
        {menu == "delete" && (
          <Blog2SecondCategoryDeleteForm closeModal={props.closeModal!} />
        )}
      </div>
    </ModalTemplate>
  );
};
export default Blog2SecondCategoryModal;
