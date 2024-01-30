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
      <div> 홈 화면 아직 미구성 </div>
      <div>
        블로그는 실행했던 코드나 정리를 위한 블로그, 아직 설명용도의 블로그는
        아닙니다.
      </div>
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
