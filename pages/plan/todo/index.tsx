import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "@/redux/store/reducers";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { authReducer } from "@/redux/store/auth/reducers";
import { store } from "@/redux/store";
import TodoItem from "./TodoItem";
import { SET_MONTH_TODO_DATE, todoReducer } from "@/redux/store/todo";
import { createStore } from "redux";

/**
 * Author : Sukyung Lee
 * FileName: TodoContainer.tsx
 * Date: 2022-09-11 09:59:51
 * Description :
 */

const TodoContainer = () => {
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
          store.dispatch(
            SET_MONTH_TODO_DATE({
              [`${todoStore.nowTodoDate}`]: response.data.data.todolist,
            })
          );
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
    <Container>
      <Title> {todoStore.nowTodoDate} </Title>
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
          value={content}
        />
        <CF.Img
          alt="right_arrow_icon"
          src="/img/right_arrow_icon.png"
          size="40px"
          backgroundColor={`${theme.backgroundColors.fourth}`}
          onClick={addTodo}
        />
      </CF.RowDiv>
    </Container>
  );
};
export default TodoContainer;
const Container = styled(CF.ColumnDiv)`
  border: solid ${theme.backgroundColors.fourth} 2px;
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  height: 100%;
  min-height: 240px;
`;

const Title = styled(CF.RowCenterDiv)`
  height: 50px;
  background-color: ${theme.backgroundColors.secondary};
  color: white;
  border-radius: 4px;
`;
