import React from "react";
import styled from "styled-components";
import Layout1 from "src/components/layout/Layout1";
import dynamic from "next/dynamic";
import Loading1 from "@/components/common/loading/Loading1";

const DynamicComponent = dynamic(
  () => import("src/components/blog/Editor/CUEditor"),
  {
    ssr: false,
    loading: () => <Loading1 />,
  }
) as any;

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
      <DynamicComponent edit={true} />
    </Container>
  );
};
Update.layout = Layout1;
export default Update;
