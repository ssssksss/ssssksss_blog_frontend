import BoardContainer from "@/components/board/BoardContainer";
import Layout2 from "@/components/layout/Layout2";
import styled from "styled-components";

/**
 * Author : Sukyung Lee
 * FileName: BoardPage.tsx
 * Date: 2022-09-20 18:26:50
 * Description :
 */

const BoardPage = () => {
  return (
    <Container>
      <BoardContainer />
    </Container>
  );
};
export default BoardPage;
BoardPage.layout = Layout2;

const Container = styled.div`
  width: 100%;
`;
