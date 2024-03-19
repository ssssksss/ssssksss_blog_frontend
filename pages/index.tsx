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
      <CC.RowCenterDiv></CC.RowCenterDiv>
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

const Container = styled.div`
  width: 100%;
  justify-content: space-between;
  ${(props) => props.theme.scroll.hiddenY};
  // FooterBox만큼은 공간을 비워두어야 한다.
  padding-bottom: 13rem;
`;

const ThreeJSBox = styled(CC.RowCenterDiv)`
  height: 30rem;
  padding: 0rem 3rem;
`;

const FooterBox = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
`;
