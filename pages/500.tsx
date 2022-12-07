import Layout1 from "@/components/layout/Layout1";
import styled from "@emotion/styled";
/**
 * Author : Sukyung Lee
 * FileName: 404.tsx
 * Date: 2022-12-07 23:20:41
 * Description :
 */
const Index = () => {
  return (
    <Container>
      <h1>500 - Server-side error occurred</h1>
    </Container>
  );
};
export default Index;

Index.layout = Layout1;
const Container = styled.div`
  width: 100%;
`;
