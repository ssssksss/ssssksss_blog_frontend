import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import Animations from '../common/animations/Animations';
import { css } from '@emotion/react';
import { Button } from '@/components/common/button/Button';
import MemoItem from './MemoItem';
import Image from 'next/image';
import { Icons } from '@/components/common/icons/Icons';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MemoTodoContainer.tsx
 * @version 0.0.1 "2023-09-29 02:20:31"
 * @description 설명
 */

interface IMemoTodoContainerProps {
  active: number;
  onClick: () => void;
}

const MemoTodoContainer = (props: IMemoTodoContainerProps) => {
  const test = [
    '11111111111111111111111111111111111111111111',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  return (
    <Container active={props.active} onClick={props.onClick}>
      {props.active === 2 ? (
        <>
          <BlogMenuBarContainer2>
            <Button bg={'secondary80'}>ALL</Button>
            <Button bg={'secondary80'}>css</Button>
            <Button bg={'secondary80'}>js</Button>
            <Button bg={'secondary80'}>
              <Image src={Icons.DeleteIcon} weight={20} height={20} alt="" />
            </Button>
            <Button color={'secondary80'} outline={true}>
              <span style={{ fontSize: '28px' }}> + </span>
            </Button>
          </BlogMenuBarContainer2>
          <Container1>
            <Container2>
              <CC.ColumnDiv gap={4}>
                {test
                  .filter((i, index) => index % 4 === 0)
                  .map(i => (
                    <MemoItem text={i}> </MemoItem>
                  ))}
              </CC.ColumnDiv>
              <CC.ColumnDiv gap={4}>
                {test
                  .filter((i, index) => index % 4 === 1)
                  .map(i => (
                    <MemoItem text={i}> </MemoItem>
                  ))}
              </CC.ColumnDiv>
            </Container2>
            <Container2>
              <CC.ColumnDiv gap={4}>
                {test
                  .filter((i, index) => index % 4 === 2)
                  .map(i => (
                    <MemoItem text={i}> </MemoItem>
                  ))}
              </CC.ColumnDiv>
              <CC.ColumnDiv gap={4}>
                {test
                  .filter((i, index) => index % 4 === 3)
                  .map(i => (
                    <MemoItem text={i}> </MemoItem>
                  ))}
              </CC.ColumnDiv>
            </Container2>
          </Container1>
        </>
      ) : (
        <FoldStateDiv> MEMO </FoldStateDiv>
      )}
    </Container>
  );
};
export default MemoTodoContainer;

const FoldStateDiv = styled.div`
  font-family: ${props => props.theme.fontFamily.typoHelloPOP};
`;

const MemoTodoNav = styled.div`
  height: 60px;
  padding: 4px;
`;

const Container1 = styled.div`
  background: ${props => props.theme.colors.white80};
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  padding: 4px;
`;

const Container2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;

  @media (max-width: ${props => props.theme.deviceSizes.tablet}) {
    display: flex;
    flex-flow: nowrap column;
  }
`;

const BlogMenuBarContainer2 = styled(CC.RowDiv)`
  background: ${props => props.theme.colors.white80};
  gap: 4px;
  padding: 10px 4px;
  flex-flow: wrap row;
  button {
    width: 70px;
    height: 28px;
    border-radius: ${props => props.theme.borderRadius.br10};
    font-family: ${props => props.theme.fontFamily.yanoljaYacheBold};
  }
`;

const Container = styled.section<{
  active: number;
}>`
  --height: 44px;
  --width: 44px;
  font-size: 1rem;
  border-radius: 10px;
  outline: solid ${props => props.theme.main.primary20} 1px;
  padding: 4px;
  ${props =>
    props.active === 2
      ? css`
          background: ${props.theme.main.primary20};
          width: calc(100% - var(--width));
          height: calc(100% - var(--height));
          ${props.theme.flex.column};
        `
      : props.active === 3
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
