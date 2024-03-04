import TagList from '@components/common/tag/TagList';
import Footer from '@components/layout/Footer';
import MyRoom from '@components/threejs/glTF/room/MyRoom';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import Head from 'next/head';
import Layout1 from 'src/components/layout/Layout1';

const HomePage = () => {
  return (
    <Container>
      <Head>
        <title> 홈 화면 </title>
      </Head>
      <CC.RowCenterDiv>
        <h2> 홈 화면 아직 미구성, 다른 개발 공부 중 </h2>
      </CC.RowCenterDiv>
      <TagList
        bg={'secondary40'}
        data={[
          'SEO && 코드 스플리팅 & Lazy Loading & 최적화',
          '타입스크립트',
          '서비스 api 로직 분리',
          '커스텀 컴포넌트들 제작',
          '블로그 정리',
          '백엔드 response 수정',
          '백엔드 코드 정리',
          'FE,BE 테스트 코드 공부',
          'BE Jenkins 재시도',
        ]}
      />
      <ThreeJSBox>
        <MyRoom />
      </ThreeJSBox>
      <Footer />
    </Container>
  );
};
HomePage.layout = Layout1;
export default HomePage;

const Container = styled.main`
  width: 100%;
  position: relative;
`;

const ThreeJSBox = styled(CC.RowCenterDiv)`
  width: calc(100% - 60px);
  height: 300px;
  padding-left: 30px;
`;
