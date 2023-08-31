// import React from "react";
// import styled from "@emotion/styled";
// import Layout1 from "src/components/layout/Layout1";
// import dynamic from "next/dynamic";
// import Loading1 from "@/components/common/loading/Loading1";
// import theme from "@/styles/theme";

// const DynamicComponent = dynamic(
//   () => import("src/components/blog/Editor/CUEditor"),
//   {
//     ssr: false,
//     loading: () => <Loading1 />,
//   }
// ) as any;

// const Update = () => {
//   return (
//     <Container>
//       <DynamicComponent edit={true} />
//     </Container>
//   );
// };
// Update.layout = Layout1;
// export default Update;

import BlogLayout from '@/components/layout/BlogLayout';
import React from 'react';
import dynamic from 'next/dynamic';
import Loading1 from '@/components/common/loading/Loading1';

const DynamicComponent = dynamic(
  () => import('@/components/blog/BlogUI/BlogPostView'),
  {
    ssr: false,
    loading: () => <Loading1 />,
  }
) as any;

const Update = () => {
  return (
    <div>
      <DynamicComponent />
    </div>
  );
};

export default Update;
Update.layout = BlogLayout;
