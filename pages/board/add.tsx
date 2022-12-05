import EditBoardPage from "@/components/board/EditBoardContainer";
import styled from "@emotion/styled";
import Layout2 from "@/components/layout/Layout2";

/**
 * Author : Sukyung Lee
 * FileName: add.tsx
 * Date: 2022-09-23 23:35:00
 * Description :
 */
const AddBoardPage = () => {
  return (
    <Container>
      <EditBoardPage />
    </Container>
  );
};
export default AddBoardPage;
AddBoardPage.layout = Layout2;
const Container = styled.div`
  width: 100%;
`;
