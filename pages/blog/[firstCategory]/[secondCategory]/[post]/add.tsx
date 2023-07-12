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

const Add = () => {
  return (
    <Container>
      <DynamicComponent />
    </Container>
  );
};
Add.layout = BlogLayout;
export default Add;

const Container = styled.div`
  background: ${theme.backgroundColors.background2};
  border-radius: 10px;
  padding: 10px 10px 0px 10px;
  font-size: ${theme.fontSizes.sm};
  max-width: ${theme.customScreen.maxWidth};
  margin: 0px auto;
`;
