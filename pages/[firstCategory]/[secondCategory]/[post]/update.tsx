import React from "react";
import styled from "styled-components";
import Layout1 from "src/components/layout/Layout1";
//import Layout2 from "@/components/layout/Layout2";
//import UpdateEditor from "@/components/blog/Editor/UpdateEditor";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import("src/components/blog/Editor/UpdateEditor"),
  {
    ssr: false,
  }
);

const Container = styled.div`
  background: ${({ theme }) => theme.customColors.third};
  border-radius: 10px;
  padding: 10px;
  font-size: 12px;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
  margin: 0px auto;
`;

const Update = () => {
  return (
    <Container>
      <DynamicComponent />
    </Container>
  );
};
Update.layout = Layout1;
export default Update;
