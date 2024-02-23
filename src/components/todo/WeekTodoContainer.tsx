import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file WeekTodoContainer.tsx
 * @version 0.0.1 "2023-09-29 02:20:15"
 * @description 설명
 */

interface IWeekTodoContainerProps {
  active: number;
  onClick: () => void;
}

const WeekTodoContainer = (props: IWeekTodoContainerProps) => {
  return (
    <Container active={props.active} onClick={props.onClick}>
      {props.active === 1 ? (
        <div> 한주의 할일 </div>
      ) : (
        <FoldStateDiv> WEEK </FoldStateDiv>
      )}
    </Container>
  );
};
export default React.memo(WeekTodoContainer);

const Container = styled.section<{
  active: boolean;
}>`
  --height: 44px;
  --width: 44px;
  font-size: 1rem;
  border-radius: 10px;
  outline: solid ${props => props.theme.colors.black60} 1px;
  ${props =>
    props.active === 1
      ? css`
          background: ${props.theme.main.contrast};
          width: calc(100% - var(--width));
          height: calc(100% - var(--height));
          ${props.theme.flex.column};
        `
      : props.active === 0
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
