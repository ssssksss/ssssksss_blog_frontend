import ViewBoardsContainer from '@/components/board/ViewBoardsContainer';
import BlogLayout from '@/components/layout/BlogLayout';
import styled from '@emotion/styled';

/**
 * Author : Sukyung Lee
 * FileName: BoardPage.tsx
 * Date: 2022-09-20 18:26:50
 * Description :
 */

const BoardPage = () => {
  return (
    <Container>
      {typeof window !== 'undefined' && <ViewBoardsContainer />}
    </Container>
  );
};
export default BoardPage;
BoardPage.layout = BlogLayout;

const Container = styled.div`
  margin: auto;
`;
