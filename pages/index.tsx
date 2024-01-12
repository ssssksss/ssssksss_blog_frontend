import styled from '@emotion/styled';
import Layout1 from 'src/components/layout/Layout1';
import { CC } from '@/styles/commonComponentStyle';
import BasicCarousel from '@/components/common/carousel/BasicCarousel';
import { commonTheme } from '@/styles/theme';
import Stack from '@/components/intro/stack';
import BlogFooter from '@/components/blog/BlogUI/BlogFooter';
import React from 'react';
import HomeThreejs from '@/components/Introduce/threejs/HomeThreejs';
import Content from '@/components/threejs/Content';
import { LoadingComponent } from '@/components/common/loading/LoadingComponent';

const HomePage = ({ test }: any) => {
  return (
    <Container>
      {/* <HomeThreejs />
      <Content /> */}
      <LoadingComponent mode={'car'} top={300} />
    </Container>
  );
};
HomePage.layout = Layout1;
export default HomePage;

const Container = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
`;
