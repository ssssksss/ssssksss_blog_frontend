import Layout2 from "@/components/layout/Layout2";
import { store } from "@/redux/store";
import styled from "styled-components";
import TodoContainer from "../../src/components/todo/TodoContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { CF } from "@/styles/commonComponentStyle";
import { useState } from "react";
import Button from "@/components/common/button/Button";
import TodoCalendar from "@/components/blog/Calendar/TodoCalendar";

/**
 * Author : Sukyung Lee
 * FileName: TodoPage.tsx
 * Date: 2022-09-11 00:01:56
 * Description :
 */

const TodoPage = () => {
  const isAuth = useSelector((state: RootState) => state.authStore.email);
  const [isOpen, setIsOpen] = useState(false);
  const sideOpenToggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isAuth && (
        <Container>
          <TodoCalendar sideOpenToggleHandler={sideOpenToggleHandler} />
          <SideDiv>
            <TodoContainer
              hide={!isOpen}
              sideOpenToggleHandler={sideOpenToggleHandler}
            />
          </SideDiv>
          {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
        </Container>
      )}
    </>
  );
};
export default TodoPage;
TodoPage.layout = Layout2;

const Container = styled(CF.RowDiv)`
  gap: 10px;
  justify-content: center;
  position: relative;
  min-height: calc(100% - 20px);
`;

const SideDiv = styled.section`
  position: absolute;
  right: 0px;
  display: flex;
  flex-flow: nowrap row;
  height: calc(100% - 20px);
  align-items: center;
  z-index: 10;

  & > img {
    height: 300px;
  }
`;

const Overlay = styled.button`
  position: absolute;
  background: #aeaeae;
  z-index: 8;
  opacity: 0.5;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
`;
