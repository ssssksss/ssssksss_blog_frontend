import React from "react";
import BlogLayout from "@/components/layout/BlogLayout";
import PostList from "src/components/blog/Post/PostList";
import BlogMenu from "@/components/blog/BlogUI/BlogMenu";
import styled from "@emotion/styled";

//2번째 카테고리 경로
const Index = () => {
  return (
    <>
      <Container>
        <BlogMenu />
      </Container>
    </>
  );
};
Index.layout = BlogLayout;
export default Index;

const Container = styled.div`
  margin: auto;
  padding: 8px 8px 2px 8px;
`;
