import EditBoardContainer from "@/components/board/EditBoardContainer";
import styled from "styled-components";
import Layout2 from "@/components/layout/Layout2";
/**
 * Author : Sukyung Lee
 * FileName: update.tsx
 * Date: 2022-09-23 23:36:28
 * Description :
 */
const UpdateBoardPage = () => {
  return (
    <Container>
      <EditBoardContainer edit={true} />
    </Container>
  );
};
export default UpdateBoardPage;
UpdateBoardPage.layout = Layout2;
const Container = styled.div`
  width: 100%;
`;
