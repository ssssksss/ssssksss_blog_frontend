import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { RootState } from "@/redux/store/reducers";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { store } from "@/redux/store";
import { SET_MONTH_TODO_DATE, todoReducer } from "@/redux/store/todo";
import TodoItem from "./TodoItem";
import { animationKeyFrames } from "@/styles/commonAnimationKeyFrames";

/**
 * Author : Sukyung Lee
 * FileName: TodoContainer.tsx
 * Date: 2022-09-11 09:59:51
 * Description :
 */

interface ITodoContainerProps {
  hide: boolean;
  sideOpenToggleHandler: () => void;
}

const TodoContainer = (props: ITodoContainerProps) => {
  const todoStore = useSelector((state: RootState) => state.todoStore);
  const [content, setContent] = useState("");
  const [todoList, setTodoList] = useState([]);

  const updateTodoHandler = (el: any) => {
    AxiosInstance({
      url: "/api/todo",
      method: "PUT",
      data: {
        id: el.id,
        content: el.content,
        indexNumber: el.indexNumber,
        isChecked: el.isChecked,
        date: new Date(todoStore.nowTodoDate),
      },
    })
      .then((response) => {
        setTodoList(response.data.data.todolist);
        // console.log(response.data);
        store.getState().todoStore.monthTodoDates[todoStore.nowTodoDate] =
          response.data.data.todolist;
        store.dispatch(
          SET_MONTH_TODO_DATE(store.getState().todoStore.monthTodoDates)
        );
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const addTodo = () => {
    if (content === "") return;
    AxiosInstance({
      url: "/api/todo",
      method: "POST",
      data: {
        content: content,
        date: todoStore.nowTodoDate,
      },
    })
      .then((response) => {
        // console.log("index.tsx : ", response.data);
        setTodoList(response.data.data.todolist);
        setContent("");
        if (store.getState().todoStore.monthTodoDates === undefined) {
          const temp: any = {};
          temp[`${todoStore.nowTodoDate}`] = response.data.data.todolist;
          store.dispatch(SET_MONTH_TODO_DATE(temp));
        } else {
          store.getState().todoStore.monthTodoDates[todoStore.nowTodoDate] =
            response.data.data.todolist;
        }
        store.dispatch(
          SET_MONTH_TODO_DATE(store.getState().todoStore.monthTodoDates)
        );
      })
      .catch((error) => {
        // console.log("index.tsx error : ", error.response);
      });
  };

  const deleteTodoHandler = (el: any) => {
    AxiosInstance({
      url: "/api/todo",
      method: "DELETE",
      data: {
        id: el.id,
        date: todoStore.nowTodoDate,
      },
    })
      .then((response) => {
        if (response.data.data == null) {
          setTodoList([]);
          delete store.getState().todoStore.monthTodoDates[
            todoStore.nowTodoDate
          ];
          store.dispatch(
            SET_MONTH_TODO_DATE(store.getState().todoStore.monthTodoDates)
          );
        } else {
          setTodoList(response.data.data.todolist);
          store.getState().todoStore.monthTodoDates[todoStore.nowTodoDate] =
            response.data.data.todolist;
          store.dispatch(
            SET_MONTH_TODO_DATE(store.getState().todoStore.monthTodoDates)
          );
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    AxiosInstance({
      url: "/api/todo",
      method: "GET",
      params: {
        date: todoStore.nowTodoDate,
      },
    })
      .then((response) => {
        setTodoList(response.data.data.todolist);
        // console.log("index.tsx : ",response.data)
      })
      .catch((error) => {
        setTodoList([]);
      });
  }, [todoStore.nowTodoDate]);

  return (
    <Container hide={props.hide}>
      <Title>
        {todoStore.nowTodoDate}
        <Button onClick={props.sideOpenToggleHandler}> X </Button>
      </Title>
      <TodoList>
        {todoList.length !== 0 &&
          todoList.map((el: any, index: number) => (
            <TodoItem
              key={index}
              el={el}
              date={todoStore.nowTodoDate}
              updateTodoHandler={updateTodoHandler}
              deleteTodoHandler={deleteTodoHandler}
            />
          ))}
        <CF.RowDiv gap={10}>
          <Input
            placeholder="todo 내용 작성"
            border={`solid 1px ${theme.backgroundColors.fourth}`}
            onChange={(e: any) => {
              setContent(e.target.value);
            }}
            onKeyPress={addTodo}
            value={content}
          />
          <CF.Img
            alt="right_arrow_icon"
            src="/img/ui-icon/right_arrow_icon.png"
            size="40px"
            backgroundColor={`${theme.backgroundColors.fourth}`}
            onClick={addTodo}
          />
        </CF.RowDiv>
      </TodoList>
    </Container>
  );
};
export default TodoContainer;

const Container = styled(CF.ColumnDiv)<{ hide: boolean }>`
  min-width: 80vw;
  border: solid 1px black;
  gap: 10px;
  border-radius: 10px 10px 0px 0px;
  padding-bottom: 20px;
  min-height: calc(100% - 20px);
  align-self: stretch;
  background: white;
  display: static;
  overflow-y: scroll;
  /* transition: all 1s ease-in-out; */
  animation: ${animationKeyFrames.RightToLeftFadein} 0.3s linear;
  ${(props) =>
    props.hide &&
    css`
      display: none;
    `}
`;
const TodoList = styled(CF.ColumnDiv)`
  gap: 10px;
  padding: 0px 4px;
  overflow-y: scroll;
`;

const Title = styled(CF.RowCenterDiv)`
  height: 60px;
  background-color: ${theme.backgroundColors.secondary};
  color: white;
  border-radius: 10px 10px 0px 0px;
  position: relative;

  & > button {
    position: absolute;
    right: 4px;
    width: 50px;
    height: 50px;
    aspect-ratio: 1;
  }
`;
