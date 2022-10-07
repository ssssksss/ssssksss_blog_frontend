import React from "react";
import Layout1 from "src/components/layout/Layout1";
import PostList from "src/components/blog/Post/PostList";
//2번째 카테고리 경로
const Index = () => {
  return (
    <>
      <PostList />
    </>
  );
};
Index.layout = Layout1;
export default Index;
