/* eslint-disable react/no-unknown-property */
import Layout1 from '@components/layout/Layout1';
import Test from '@components/ui-test/Test';
import styled from '@emotion/styled';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Author : Sukyung Lee
 * FileName: index.tsx
 * Date: 2023-01-05 01:39:14
 * Description :
 */
// return <Container> <div> {new Date().toString()} </div> </Container>;

// 60개의 제품 데이터 생성

const Index = () => {
  useEffect(() => {
    gsap.to('.box1', {
      scrollTrigger: {
        trigger: '.box1',
        start: '20% 20%',
        end: '100% 100%',
        // markers: true, // 마커 표시 역할
      },
      x: 200,
    });
  }, []);

  return (
    <Container className={'container'}>
      <Test />
      <Test />
      <Test />
      <Test />
      <div className={'box1'}> 123 </div>
      <Test />
      <Test />
      <Test />
      <Test />
      <Test />
      <Test />
    </Container>
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};

const Container = styled.div`
  outline: solid black 0.1rem;
`;
