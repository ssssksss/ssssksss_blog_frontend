import React from "react";
import Layout1 from "src/components/layout/Layout1";
import PostList from "src/components/blog/Post/PostList";
//2번째 카테고리 경로
const Index = () => {
  return (
    <React.StrictMode>
      <PostList />
    </React.StrictMode>
  );
};
Index.layout = Layout1;
export default Index;
