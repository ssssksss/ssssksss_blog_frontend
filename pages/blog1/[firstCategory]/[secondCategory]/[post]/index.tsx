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

import Layout1 from "@/components/layout/Layout1";
import React from "react";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("src/components/blog/BlogUI/BlogItemView"), {
  ssr: false,
}) as any;

const Index = () => {
  return (
    <div>
      <DynamicComponent />
    </div>
  );
};

export default Index;
Index.layout = Layout1;
