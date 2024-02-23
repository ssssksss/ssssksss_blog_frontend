import styled from '@emotion/styled';
import { Spinner32 } from './../spinner/Spinners';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file loadingComponents.tsx
 * @version 0.0.1 "2024-02-23 11:27:43"
 * @description position="relative"로 감싼 div가 필요
 */
const LoadingComponents = () => {
  return (
    <Container>
      <Spinner32 />
    </Container>
  );
};
export default LoadingComponents;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
