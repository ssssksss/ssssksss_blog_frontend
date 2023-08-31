import React from 'react';
import BlogLayout from '@/components/layout/BlogLayout';
import PostList from 'src/components/blog/Post/PostList';
import BlogMenu from '@/components/blog/BlogUI/BlogPosts';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import BlogFirstMenu from '@/components/blog/BlogUI/BlogFirstMenu';
import BlogSecondMenu from '@/components/blog/BlogUI/BlogSecondMenu';

//2번째 카테고리 경로
const Index = () => {
  const router = useRouter();
  return (
    <>
      <Container>
        <BlogFirstMenu />
        <BlogSecondMenu />
        <PostList />
      </Container>
    </>
  );
};
Index.layout = BlogLayout;
export default Index;

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 8px 8px 2px 8px;
`;
