import { CC } from '@/styles/commonComponentStyle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file AllTodoContainer.tsx
 * @version 0.0.1 "2023-09-29 02:20:44"
 * @description 설명
 */
interface IAllTodoContainerProps {
  active: number;
  onClick: () => void;
}

const AllTodoContainer = (props: IAllTodoContainerProps) => {
  return (
    <Container active={props.active} onClick={props.onClick}>
      {props.active === 3 ? (
        <div> 할일 리스트 </div>
      ) : (
        <FoldStateDiv> ALL </FoldStateDiv>
      )}
    </Container>
  );
};
export default AllTodoContainer;

const Container = styled.section<{
  active: boolean;
}>`
  --height: 44px;
  --width: 44px;
  font-size: 1rem;
  border-radius: 10px;
  outline: solid ${props => props.theme.main.primary20} 1px;
  ${props =>
    props.active === 3
      ? css`
          background: ${props.theme.main.primary20};
          width: calc(100% - var(--width));
          height: calc(100% - var(--height));
          ${props.theme.flex.column};
        `
      : props.active === 2
      ? css`
          width: var(--width);
          height: calc(100% - var(--height));
          font-size: 2rem;
          text-transform: uppercase;
          writing-mode: vertical-rl;
          text-orientation: upright;
          letter-spacing: 8px;
          ${props.theme.flex.row.center.center};
          cursor: pointer;
        `
      : css`
          font-size: 2rem;
          width: calc(50%);
          height: calc(var(--height));
          ${props.theme.flex.row.center.center};
          cursor: pointer;
        `}
`;

const FoldStateDiv = styled.div`
  font-family: ${props => props.theme.fontFamily.typoHelloPOP};
`;
