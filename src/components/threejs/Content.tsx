import styled from '@emotion/styled';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import BlogFooter from '../blog/BlogUI/BlogFooter';
import Stack from '../intro/stack';

// gsap.registerPlugin(ScrollTrigger);
const Content = () => {
  const ref1 = useRef(null);

  useEffect(() => {
    gsap.to('.section-two', {
      opacity: 0,
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-one',
        start: 'top+=60% top',
        endTrigger: '.section-two',
        end: 'top top+=200px',
        toggleActions: 'play none none none',
        markers: true,
        scrub: 1,
      },
    });

    tl2.to('.section-two', {
      // x: 0,
      opacity: 1,
      ease: 'yoyoEase.SteppedEase',
      duration: 3,
    });
  }, []);

  return (
    <Container ref={ref1} className="content">
      <Section className="section-one">
        <h1>자기소개 및 포트폴리오</h1>
      </Section>
      <Section1 className="section-two">
        <h1>Project</h1>
        {/* <BasicCarousel
          arr={arr}
          arrLength={arr.length}
          IntervalTime={15000}
          transitionTime={1000}
        /> */}
        <Div className="section-two-1"> 1 </Div>
        <Div className="section-two-2"> 2 </Div>
        <Div className="section-two-3"> 3 </Div>
      </Section1>
      <Section className="section-three">
        <h1>Stack</h1>
        <Stack />
      </Section>
      <Section className="section-four">
        <h1>Introduce</h1>
      </Section>
      <Section className="section-five">
        <h1>Contact Me</h1>
        <BlogFooter />
      </Section>
    </Container>
  );
};

export default Content;
const Container = styled.div`
  width: 100%;
  height: auto;
  z-index: 1;
  /* background-color: aliceblue; */

  h1 {
    /* font-size: 3.5em; */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: black;
    z-index: 999;
    text-transform: uppercase;
  }
`;

const Section = styled.section`
  height: 100vh;
  padding: 20px;
  /* font-size: 4vh; */
`;
const Section1 = styled.section`
  height: 300vh;
  padding: 20px;
`;

const Div = styled.div`
  height: 100vh;
`;
