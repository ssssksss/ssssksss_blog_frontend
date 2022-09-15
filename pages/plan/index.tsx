import CustomCalendar from "@/components/blog/Calendar/TodoCalendar";
import Layout2 from "@/components/layout/Layout2";
import { store } from "@/redux/store";
import styled from "styled-components";
import TodoContainer from "./todo";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { CF } from "@/styles/commonComponentStyle";

/**
 * Author : Sukyung Lee
 * FileName: Plan.tsx
 * Date: 2022-09-11 00:01:56
 * Description :
 */
const Plan = () => {
  return (
    <Container>
      <CustomCalendar />
      <TodoContainer />
    </Container>
  );
};
export default Plan;
Plan.layout = Layout2;
const Container = styled(CF.RowDiv)`
  padding: 10px 0px;
  gap: 10px;
  height: calc(100vh - 200px);
  background: red;
`;
