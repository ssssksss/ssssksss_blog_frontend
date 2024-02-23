import { Spinner1, Spinner34, Spinner37 } from '@/components/spinner/Spinners';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file LoadingComponent.tsx
 * @version 0.0.1 "2023-10-09 23:54:12"
 * @description 설명
 */

interface ILoadingComponentProps {
  left?: String;
  top?: String;
  mode?: String;
}

const LoadingComponent = (props: ILoadingComponentProps) => {
  return (
    <Container top={props.top} left={props.left}>
      {props.mode === 'board' ? (
        <Spinner37 />
      ) : props.mode === 'car' ? (
        <Spinner34 />
      ) : (
        <Spinner1 />
      )}
    </Container>
  );
};

export default LoadingComponent;

const Container = styled(CC.RowCenterDiv)<ILoadingComponentProps>`
  /* left: ${props => props.left || '50%'};
  top: ${props => (props.top ? `calc(${props.top} * 1px)` : '50%')};
  transform: translate(-50%, -50%); */
  max-width: 60px;
  max-height: 60px;
  aspect-ratio: 1 / 1;

  & > div {
    height: 100%;
    aspect-ratio: 1;
  }
`;
