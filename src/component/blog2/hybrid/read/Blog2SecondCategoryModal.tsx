import Button from "@component/common/button/hybrid/Button";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import {useState} from "react";
import useBlog2Store from "src/store/blog2Store";
import Blog2SecondCategoryCreateForm from "./Blog2SecondCategoryCreateForm";
import Blog2SecondCategoryUpdateForm from "./Blog2SecondCategoryUpdateForm";

interface IBlog2SecondCategoryModal extends IModalComponent {}

const buttons = [
  {label: "추가", value: "add"},
  {label: "수정", value: "update"},
  {label: "삭제", value: "delete"},
];

const Blog2SecondCategoryModal = (props: IBlog2SecondCategoryModal) => {
  const [menu, setMenu] = useState("add");
  const blog2Store = useBlog2Store();

  return (
    <ModalTemplate
      className={
        "flex w-[calc(100vw-2rem)] max-w-[37.5rem] flex-col overflow-y-scroll rounded-b-[1rem] bg-white-100 px-[2.75rem] pb-8 pt-[3rem]"
      }>
      {props.closeButtonComponent}
      <div className="flex w-full gap-4">
        {buttons.map((btn) => (
          <Button
            key={btn.value}
            className={`h-[3rem] w-full ${
              menu === btn.value &&
              "bg-primary-20 text-lg font-bold text-black-80"
            } rounded-[1rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20`}
            onClick={() => setMenu(btn.value)}>
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
      </div>
    </ModalTemplate>
  );
};
export default Blog2SecondCategoryModal;
