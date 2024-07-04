/* eslint-disable react/no-unknown-property */
import CustomEditor from '@components/editor/CustomEditor';
import ViewEditor from '@components/editor/ViewEditor';
import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ReactElement, useCallback, useRef, useState } from 'react';
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
      <CC.GridColumn2 h={'90%'}>
        <CustomEditor ref={textareaRef} textChangeHandler={textChangeHandler} />
        <ViewEditor value={text} />
      </CC.GridColumn2>
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
