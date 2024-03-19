import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { ReactNode } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file RowScrollListBox.tsx
 * @version 0.0.1 "2024-03-05 04:13:19"
 * @description 설명
 */
interface IRowScrollListBoxProps {
  children: ReactNode;
  scrollHidden: boolean;
}

const RowScrollListBox = (props: IRowScrollListBoxProps) => {
  return <Container {...props}>{props.children}</Container>;
};
export default RowScrollListBox;

const Container = styled(CC.RowDiv)<{ scrollHidden: boolean }>`
  overflow-x: scroll;
  width: 100%;
  ::-webkit-scrollbar {
    width: auto;
    height: 0.8rem;
    display: contents;
    position: fixed;
  }
  // 스크롤 막대
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.main.primary20};
    border-radius: 1.6rem;
  }
  // 스크롤 막대가 이동하는 공간
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.main.secondary20};
  }
  ${(props) => props.scrollHidden && props.theme.scroll.hidden};
  & > * {
    flex-shrink: 0;
  }
`;
