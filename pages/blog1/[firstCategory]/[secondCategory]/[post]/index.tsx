import BlogLayout from "@/components/layout/BlogLayout";
import React from "react";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("src/components/blog/Post/PostView"), {
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
Index.layout = BlogLayout;
