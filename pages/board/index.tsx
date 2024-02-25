import BoardHeaderContainer from '@components/board/BoardHeadContainer';
import BoardMainContainer from '@components/board/BoardMainContainer';
import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import Head from 'next/head';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 설명
 */
const Index = () => {
  return (
    <Container>
      <Head>
        <title> 게시판 </title>
      </Head>
      <BoardHeaderContainer />
      <BoardMainContainer />
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.div`
  width: 100%;
  gap: 10px;
  background: ${(props) => props.theme.main.contrast};
  border-radius: 10px 10px 0px 0px;
  padding: 4px;
  display: grid;
  grid-template-rows: auto calc(100% - 92px);
`;
