import styled from '@emotion/styled';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Overlay.tsx
 * @version 0.0.1 "2024-04-09 05:18:52"
 * @description 설명
 */
const Overlay = (zIndex?: number) => {
  return <Container zIndex={zIndex}></Container>;
};
export default Overlay;

const Container = styled.div<{ zIndex?: number }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  border-radius: 0.8rem;
  opacity: 0.8;
  border: 0rem;
  z-index: ${(props) => props.zIndex || 10};
  background: ${(props) => props.theme.colors.black80};
`;
