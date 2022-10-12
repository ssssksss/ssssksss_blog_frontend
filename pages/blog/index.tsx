import Layout2 from "@/components/layout/Layout2";
import styled from "styled-components";
import { useEffect } from "react";

/**
 * Author : Sukyung Lee
 * FileName: BoardPage.tsx
 * Date: 2022-09-20 18:26:50
 * Description :
 */

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <div> </div>
    </Container>
  );
};
export default BlogPage;
BlogPage.layout = Layout2;

const Container = styled.div`
  width: 100%;
`;
