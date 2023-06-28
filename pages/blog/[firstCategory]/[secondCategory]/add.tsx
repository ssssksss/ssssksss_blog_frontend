import React from "react";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import Loading1 from "@/components/common/loading/Loading1";
import theme from "@/styles/theme";
import BlogPostEditor from "@/components/blog/Editor/BlogItemEditor";
import Layout1 from "@/components/layout/Layout1";

const DynamicComponent = dynamic(() => import("@/components/blog/Editor/BlogItemEditor"), {
  ssr: false,
  loading: () => <Loading1 />,
}) as any;

const Add = () => {
  return (
    <Container>
      <DynamicComponent />
    </Container>
  );
};
Add.layout = Layout1;
export default Add;

const Container = styled.div`
  background: ${theme.backgroundColors.background2};
  border-radius: 10px;
  padding: 10px 10px 0px 10px;
  font-size: ${theme.fontSizes.sm};
  max-width: ${theme.customScreen.maxWidth};
  margin: 0px auto;
`;
