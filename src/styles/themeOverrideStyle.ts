import styled from '@emotion/styled';
import { CC } from '@/styles/commonComponentStyle';

export const overflowHoverVerticalScrollStyle = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    ::-webkit-scrollbar {
      width: auto;
      height: 8px;
      display: contents;
      position: fixed;
    }
    ::-webkit-scrollbar-thumb {
      background: ${props => props.theme.main.primary20};
      border-radius: 16px;
    }
    ::-webkit-scrollbar-track {
    }
  }
`;
