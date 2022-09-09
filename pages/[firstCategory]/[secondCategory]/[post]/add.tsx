import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Layout1 from "src/components/layout/Layout1";
//import Layout2 from "@/components/layout/Layout2";
//import CreateEditor from "@/components/blog/Editor/CreateEditor";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import("src/components/blog/Editor/CreateEditor"),
  {
    ssr: false,
  }
);

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
  background: ${({ theme }) => theme.customColors.third};
  border-radius: 10px;
  padding: 10px;
  font-size: 12px;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
  margin: 0px auto;
`;
