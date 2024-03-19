import BoardHeaderContainer from '@components/board/BoardHeadContainer';
import BoardMainContainer from '@components/board/BoardMainContainer';
import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
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
        <title>게시판</title>
      </Head>
      <BoardHeaderContainer />
      <BoardMainContainer />
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled(CC.ColumnDiv)`
  gap: 0.8rem;
  background: ${(props) => props.theme.main.contrast};
  padding: 0.2rem;
`;
