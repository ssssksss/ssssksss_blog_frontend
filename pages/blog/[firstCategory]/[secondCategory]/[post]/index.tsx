// import BlogLayout from "@/components/layout/BlogLayout";
// import React from "react";
// import dynamic from "next/dynamic";

// const DynamicComponent = dynamic(() => import("src/components/blog/Post/PostView"), {
//   ssr: false,
// }) as any;

// const Index = () => {
//   return (
//     <div>
//       <DynamicComponent />
//     </div>
//   );
// };

// export default Index;
// Index.layout = BlogLayout;

import BlogLayout from "@/components/layout/BlogLayout";
import React from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";

const DynamicComponent = dynamic(() => import("src/components/blog/BlogUI/BlogItemView"), {
  ssr: false,
}) as any;

const Index = () => {
  return (
    <Container>
      <DynamicComponent />
    </Container>
  );
};

Index.layout = BlogLayout;
export default Index;

const Container = styled.div`
  padding: 10px 10px 0px 10px;
`;
