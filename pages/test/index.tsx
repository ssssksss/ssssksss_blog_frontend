/* eslint-disable react/no-unknown-property */
import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lottie from "lottie-react";
import { ReactElement, useCallback, useRef, useState } from 'react';
import loadingLottie from "../../public/lottie/solitour_auth_logo_image.json";
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [text, setText] = useState('');
  const textareaRef = useRef();
  const textChangeHandler = useCallback((value: string) => {
    setText(value);
  }, []);

  return (
    <Container>
      <h1> 마크다운 만들기(보류) </h1>
      {/* <CC.GridColumn2 h={'90%'}>
        <CustomEditor ref={textareaRef} textChangeHandler={textChangeHandler} />
        <ViewEditor value={text} />
      </CC.GridColumn2> */}
      <div className={'p-[5rem]'}>
        <Lottie
          animationData={loadingLottie}
          className={'w-[275px] h-[245px]'}
        />
      </div>
    </Container>
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};

const Container = styled.div`
  outline: solid black 0.1rem;
  height: 100vh;
`;
