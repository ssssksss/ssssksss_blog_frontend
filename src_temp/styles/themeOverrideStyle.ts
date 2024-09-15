import styled from '@emotion/styled';

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
      height: 0.8rem;
      display: contents;
      position: fixed;
    }
    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.main.primary20};
      border-radius: 1.6rem;
    }
    ::-webkit-scrollbar-track {
    }
  }
`;
