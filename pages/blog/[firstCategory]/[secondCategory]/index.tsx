import React from "react";
import Layout2 from "src/components/layout/Layout2";
import PostList from "src/components/blog/Post/PostList";

//2번째 카테고리 경로
const Index = () => {
  return (
    <>
      <PostList />
    </>
  );
};
Index.layout = Layout2;
export default Index;
