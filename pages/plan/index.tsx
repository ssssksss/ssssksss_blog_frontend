import Layout2 from "@/components/layout/Layout2";
import { store } from "@/redux/store";
import styled from "styled-components";
import PlanSideContainer from "../../src/components/plan/PlanSideContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { CF } from "@/styles/commonComponentStyle";
import { useState } from "react";
import Button from "@/components/common/button/Button";
import PlanCalendar from "@/components/plan/Calendar/PlanCalendar";

/**
 * Author : Sukyung Lee
 * FileName: PlanPage.tsx
 * Date: 2022-09-11 00:01:56
 * Description :
 */

const PlanPage = () => {
  const isAuth = useSelector((state: RootState) => state.authStore.email);
  const [isOpen, setIsOpen] = useState(false);
  const sideOpenToggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isAuth && (
        <Container>
          <PlanCalendar sideOpenToggleHandler={sideOpenToggleHandler} />
          <PlanSideContainer
            hide={!isOpen}
            sideOpenToggleHandler={sideOpenToggleHandler}
          />
          {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
        </Container>
      )}
    </>
  );
};
export default PlanPage;
PlanPage.layout = Layout2;

const Container = styled(CF.RowDiv)`
  gap: 10px;
  justify-content: center;
  position: relative;
  width: 100%;
  min-height: calc(100% - 20px);
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
