import React from "react";
import styled from "@emotion/styled";
import BlogLayout from "@/components/layout/BlogLayout";
import dynamic from "next/dynamic";
import Loading1 from "@/components/common/loading/Loading1";
import theme from "@/styles/theme";

const DynamicComponent = dynamic(() => import("src/components/blog/Editor/CUEditor"), {
  ssr: false,
  loading: () => <Loading1 />,
}) as any;

const Update = () => {
  return (
    <div>
      <DynamicComponent edit={true} />
    </div>
  );
};
Update.layout = BlogLayout;
export default Update;
