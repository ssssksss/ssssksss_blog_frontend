import Input from "@/components/common/input/Input";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

/**
 * Author : Sukyung Lee
 * FileName: TodoItem.tsx
 * Date: 2022-09-13 12:45:26
 * Description :
 */

interface ITodoItemProps {
  el: {
    id: number;
    content: string;
    indexNumber: number;
    isChecked: boolean;
  };
  updateTodoHandler: (el: any) => void;
  deleteTodoHandler: (el: any) => void;
  date: string;
}

const TodoItem = (props: ITodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState("");

  const updateContentHandler = (el: any, type: string) => {
    props.updateTodoHandler({
      id: el.id,
      content: type === "checkbox" ? el.content : content,
      indexNumber: el.indexNumber,
      isChecked: type === "checkbox" ? !el.isChecked : el.isChecked,
      date: props.date,
    });
    setIsEdit(false);
  };

  const editChangeHandler = () => {
    setContent(props.el.content);
    setIsEdit(true);
  };

  return (
    <Container checked={props.el.isChecked}>
      <CF.RowDiv gap={10}>
        {isEdit ? (
          <>
            <Input
              onChange={(e: any) => setContent(e.target.value)}
              value={content}
            />
            <CF.Img
              alt="submit_icon"
              src="/img/right_arrow_icon.png"
              size="30px"
              onClick={() => updateContentHandler(props.el, "")}
            />
            <CF.Img
              alt="edit_icon"
              src="/img/edit_icon.png"
              size="30px"
              onClick={() => setIsEdit(false)}
            />
          </>
        ) : (
          <>
            <Input
              type="checkbox"
              width="20px"
              height="20px"
              onChange={() => updateContentHandler(props.el, "checkbox")}
              checked={props.el.isChecked}
            />
            <CF.Text width={"calc(100%)"} maxWidth={"calc(100% - 100px)"}>
              {props.el.content}
            </CF.Text>
            {!props.el.isChecked && (
              <CF.Img
                alt="edit_icon"
                src="/img/edit_icon.png"
                size="30px"
                onClick={editChangeHandler}
              />
            )}
          </>
        )}
        <CF.Img
          alt="delete_icon"
          src="/img/delete_icon.png"
          size="30px"
          onClick={() => props.deleteTodoHandler(props.el)}
        />
      </CF.RowDiv>
    </Container>
  );
};
export default TodoItem;

const Container = styled(CF.RowBetweenDiv)<{ checked: boolean }>`
  height: 50px;
  padding: 10px;
  background-color: ${theme.backgroundColors.fourth};
  gap: 10px;
  border-radius: 4px;
  max-width: 300px;
`;
