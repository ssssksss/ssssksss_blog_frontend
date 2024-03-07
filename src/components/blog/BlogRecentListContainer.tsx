import styled from '@emotion/styled';
import { memo, useReducer } from 'react';
import BlogItem from './BlogItem';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogRecentListContainer.tsx
 * @version 0.0.1 "2024-03-07 02:25:51"
 * @description 설명
 */
const BlogRecentListContainer = () => {
  const [isOpenModal, IsOpenModalToggle] = useReducer((v) => !v, false);
  return (
    <Container isOpen={isOpenModal}>
      <Title onClick={() => IsOpenModalToggle()} isOpen={isOpenModal}>
        <span> 최근 </span>
        <span> 목록 </span>
      </Title>
      <ScrollContainer isOpen={isOpenModal}>
        {isOpenModal &&
          JSON.parse(window.localStorage.getItem('recentBlog') || '[]').map(
            (i) => <BlogItem key={i.id} element={i} viewMode={false} />,
          )}
      </ScrollContainer>
    </Container>
  );
};
export default memo(BlogRecentListContainer);

const Container = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 4px;
  top: 4px;
  /* transform: translate(0%, -100%); */
  background: ${(props) => props.theme.main.secondary40};
  border-radius: 8px;
  width: ${(props) => (props.isOpen ? '300px' : 'max-content')};
  padding: ${(props) => (props.isOpen ? '10px 4px' : '4px')};
  z-index: 10;
`;

const Title = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.main.contrast};
  font-size: ${(props) => (props.isOpen ? '1.2rem' : '0.8rem')};
  font-weight: ${(props) => (props.isOpen ? '600' : '400')};
  flex-direction: ${(props) => (props.isOpen ? 'row' : 'column')};
  height: ${(props) => props.isOpen && '32px'};
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const ScrollContainer = styled.div<{ isOpen: boolean }>`
  height: ${(props) => props.isOpen && '50vh'};
  ${(props) => props.theme.scroll.hidden};
`;
