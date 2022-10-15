import styled from "styled-components";
import Layout2 from "@/components/layout/Layout2";
/**
 * Author : Sukyung Lee
 * FileName: index.tsx
 * Date: 2022-10-15 21:48:12
 * Description :
 */
const TodoPage = () => {
  return (
    <Container>
      <div> TODO Page </div>
    </Container>
  );
};
export default TodoPage;
TodoPage.layout = Layout2;
const Container = styled.div`
  width: 100%;
`;
