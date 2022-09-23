import ViewBoardContainer from "@/components/board/ViewBoardContainer";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout2 from "@/components/layout/Layout2";
/**
 * Author : Sukyung Lee
 * FileName: ViewBoardPage.tsx
 * Date: 2022-09-23 23:37:34
 * Description :
 */
const ViewBoardPage = () => {
  return (
    <Container>
      <div> 1 </div>
      {/* <ViewBoardContainer /> */}
    </Container>
  );
};
export default ViewBoardPage;
ViewBoardPage.layout = Layout2;
const Container = styled.div`
  width: 100%;
`;
