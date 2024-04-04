import styled from '@emotion/styled';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
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
      <Title onClick={(e: MouseEvent) => {
        setIsOpen(prev=>!prev);
        e.stopPropagation();
      }} isOpen={isOpen}>
        {isOpen ? "최근 목록" : <LowPriorityIcon />}
      </Title>
      {
        isOpen &&
        <ScrollContainer isOpen={isOpen}>
        {isOpen &&
          JSON.parse(window.localStorage.getItem('recentBlog') || '[]').map(
            (i) => (
              <Link key={i.id} href={`/blog/${i.id}`}>
                <BlogItem element={i} viewMode={false} />
              </Link>
            ),
            )}
      </ScrollContainer>
          }
    </Container>
  );
};
export default memo(BlogRecentListContainer);

const Container = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 0px;
  top: 0px;
  background: ${(props) => props.theme.main.secondary40};
  border-radius: 1rem;
  width: ${(props) => (props.isOpen ? '60vw' : '3rem')};
  height: ${(props) => (props.isOpen ? 'max-content' : '100%')};
  padding: ${(props) => (props.isOpen ? '1rem 0.4rem' : '0.4rem')};
  z-index: 4;
  display: ${(props) => (props.isOpen ? 'block' : 'flex')};
  align-items: center;
`;

const Title = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.main.contrast};
  font-size: ${(props) => (props.isOpen ? '1.2rem' : '1rem')};
  font-weight: ${(props) => (props.isOpen ? '600' : '400')};
  flex-direction: ${(props) => (props.isOpen ? 'row' : 'column')};
  width: ${(props) => props.isOpen ? '100%' : '2rem'};
  height: ${(props) => props.isOpen && '3.2rem'};
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

  ${(props) => props.theme.scroll.hidden};
`;
