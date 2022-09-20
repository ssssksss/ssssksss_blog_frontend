import CustomCalendar from "@/components/blog/Calendar/TodoCalendar";
import Layout2 from "@/components/layout/Layout2";
import { store } from "@/redux/store";
import styled from "styled-components";
import TodoContainer from "../../src/components/blog/Todo/TodoContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { CF } from "@/styles/commonComponentStyle";

/**
 * Author : Sukyung Lee
 * FileName: PlanPage.tsx
 * Date: 2022-09-11 00:01:56
 * Description :
 */
const PlanPage = () => {
  const test = useSelector((state: RootState) => state.authStore.email);
  return (
    <Container>
      {test && (
        <>
          <CustomCalendar />
          <TodoContainer />
        </>
      )}
    </Container>
  );
};
export default PlanPage;
PlanPage.layout = Layout2;

const Container = styled(CF.RowDiv)`
  padding: 10px 0px;
  gap: 10px;
  justify-content: center;

  & > div:nth-child(1) {
    width: 70%;
  }

  & > div:nth-child(2) {
    width: 30%;
  }
`;
