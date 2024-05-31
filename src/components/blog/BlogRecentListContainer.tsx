import styled from '@emotion/styled';
import HistoryIcon from '@mui/icons-material/History';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import { IBlogItemProps } from 'src/@types/blog/BlogHeadContainer';
import BlogItem from './BlogItem';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogRecentListContainer.tsx
 * @version 0.0.1 "2024-03-07 02:25:51"
 * @description 설명
 */
const BlogRecentListContainer = () => {
  // const [isOpen, IsOpenModalToggle] = useReducer((v) => !v, false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const temp = () => {
      setIsOpen(false);
    };
    window.addEventListener('click', temp);

    return () => {
      window.removeEventListener('click', temp);
    };
  }, []);


  return (
    <Container isOpen={isOpen}>
      <Title
        onClick={(event) => {
          setIsOpen((prev) => !prev);
          const temp = JSON.parse(window.localStorage.getItem('recentBlog') || '[]').filter((i: { status: string }) => i.status != "HIDE");
          window.localStorage.setItem('recentBlog',JSON.stringify(temp));
          event.stopPropagation();
          event.preventDefault();
        }}
        isOpen={isOpen}
      >
        {isOpen ? '최근 목록' : <HistoryIcon />}
      </Title>
      {/* 아래는 최근 목록이 담긴 리스트 절대 위치로 이동 */}
      {isOpen && (
        <ScrollContainer isOpen={isOpen}>
          {isOpen &&
            JSON.parse(window.localStorage.getItem('recentBlog') || '[]').map(
              (i: IBlogItemProps) => (
                <Link key={i.id} href={`/blog/${i.id}`}>
                  <BlogItem element={i} viewMode={false} />
                </Link>
              ),
            )}
        </ScrollContainer>
      )}
    </Container>
  );
};
export default memo(BlogRecentListContainer);

const Container = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 0;
  top: ${(props) => (props.isOpen ? '3rem' : '0px')};
  border-radius: 1rem;
  width: ${(props) => (props.isOpen ? '80vw' : '2.75rem')};
  height: ${(props) => (props.isOpen ? 'max-content' : '100%')};
  padding: ${(props) => (props.isOpen ? '1rem 0.4rem' : '0.4rem')};
  z-index: 4;
  display: ${(props) => (props.isOpen ? 'block' : 'flex')};
  align-items: center;
  background: ${props=> props.isOpen && props.theme.main.primary20};
`;

const Title = styled.button<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.isOpen ? '1.2rem' : '1rem')};
  font-weight: ${(props) => (props.isOpen ? '600' : '400')};
  flex-direction: ${(props) => (props.isOpen ? 'row' : 'column')};
  width: ${(props) => (props.isOpen ? '100%' : '2rem')};
  height: ${(props) => props.isOpen && '3.2rem'};
  background: transparent;
  &:hover {
    cursor: pointer;
  }
`;
const ScrollContainer = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: ${(props) => props.isOpen && '100%'};
  a > div {
    display: block;
  }
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
