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
        <title>홈 화면</title>
      </Head>
      <CC.RowCenterDiv>
        <h2> 현재 반응형 작업 중 </h2>
      </CC.RowCenterDiv>
      <ThreeJSBox>
        <MyRoom />
      </ThreeJSBox>
      <FooterBox>
        <Footer />
      </FooterBox>
    </Container>
  );
};
HomePage.layout = Layout1;
export default HomePage;

const Container = styled(CC.ColumnDiv.withComponent('main'))`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  ${(props) => props.theme.scroll.hiddenY};
`;

const ThreeJSBox = styled(CC.RowCenterDiv)`
  height: 300px;
  padding: 0px 30px;
`;

const FooterBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: auto;
`;
