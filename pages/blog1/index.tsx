import BlogLayout from "@/components/layout/BlogLayout";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { CC } from "@/styles/commonComponentStyle";

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
    <CC.Container>
      <div> </div>
    </CC.Container>
  );
};
export default BlogPage;
BlogPage.layout = BlogLayout;
