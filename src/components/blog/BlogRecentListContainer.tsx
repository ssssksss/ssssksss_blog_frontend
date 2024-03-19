import styled from '@emotion/styled';
import Link from 'next/link';
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
            (i) => (
              <Link key={i.id} href={`/blog/${i.id}`}>
                <BlogItem element={i} viewMode={false} />
              </Link>
            ),
          )}
      </ScrollContainer>
    </Container>
  );
};
export default memo(BlogRecentListContainer);

const Container = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 0rem;
  top: 0rem;
  background: ${(props) => props.theme.main.secondary40};
  border-radius: 0.8rem;
  width: ${(props) => (props.isOpen ? '60vw' : 'max-content')};
  height: max-content;
  padding: ${(props) => (props.isOpen ? '1rem 0.4rem' : '0.4rem')};
  z-index: 10;
`;

const Title = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.main.contrast};
  font-size: ${(props) => (props.isOpen ? '1.2rem' : '1rem')};
  font-weight: ${(props) => (props.isOpen ? '600' : '400')};
  flex-direction: ${(props) => (props.isOpen ? 'row' : 'column')};
  height: ${(props) => props.isOpen && '3.2rem'};
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const ScrollContainer = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: ${(props) => props.isOpen && '100%'};
  ${(props) => props.theme.scroll.hidden};

  a > div {
    display: block;
  }
`;
