//import PostView from "@/components/blog/Post/PostView";
import Layout1 from "@/components/layout/Layout1";
//import Layout2 from "@/components/layout/Layout2";
import React from "react";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import("@/components/blog/Post/PostView"),
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
Index.layout = Layout1;
