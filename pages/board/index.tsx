import ViewBoardsContainer from "@/components/board/ViewBoardsContainer";
import Layout1 from "@/components/layout/Layout1";
import styled from "@emotion/styled";

/**
 * Author : Sukyung Lee
 * FileName: BoardPage.tsx
 * Date: 2022-09-20 18:26:50
 * Description :
 */

const BoardPage = () => {
  return (
    <Container>
      {typeof window !== "undefined" && <ViewBoardsContainer />}
    </Container>
  );
};
export default BoardPage;
BoardPage.layout = Layout1;

const Container = styled.div`
  width: 100%;
`;
