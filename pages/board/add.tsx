import EditBoardPage from "@/components/board/EditBoardContainer";
import styled from "@emotion/styled";
import BlogLayout from "@/components/layout/BlogLayout";

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
AddBoardPage.layout = BlogLayout;
const Container = styled.div`
  width: 100%;
`;
