import Layout3 from "src/components/layout/Layout3";
import React from "react";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import("src/components/blog/Post/PostView"),
  {
    ssr: false,
  }
);

const Index = () => {
  return (
    <div>
      <DynamicComponent />
    </div>
  );
};

export default Index;
Index.layout = Layout3;
