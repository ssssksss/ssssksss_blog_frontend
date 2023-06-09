import styled from "@emotion/styled";
import Layout1 from "src/components/layout/Layout1";
import { CC } from "@/styles/commonComponentStyle";
import BasicCarousel from "@/components/common/carousel/BasicCarousel";
import theme from "@/styles/theme";
import Stack from "@/components/intro/stack";
import BlogFooter from "@/components/blog/BlogUI/BlogFooter";
import React from "react";
import { GetStaticProps } from "next";
import Portfolio from "@/components/landingPage/Portfolio";

const HomePage = ({ test }: any) => {
  return (
    <Container>
      <Portfolio />
    </Container>
  );
};
HomePage.layout = Layout1;
export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      test: "",
    },
  };
};

const Container = styled(CC.ColumnDiv)``;

const Chapter = styled.section`
  width: 100%;
  &:nth-of-type(2n-1) {
    background: ${theme.backgroundColors.white};
  }
  &:nth-of-type(2n) {
    background: ${theme.backgroundColors.grayLight};
  }
`;
