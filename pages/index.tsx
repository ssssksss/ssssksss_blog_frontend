import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import Head from 'next/head';
import Layout1 from 'src/components/layout/Layout1';
import MyRoom from './../src/components/threejs/glTF/room/MyRoom';
import Footer from './../src/components/layout/Footer';

export default function HomePage() {
  return (
    <CC.ColCenterStartBox
      scroll={'scrollY'}
      padding={'0rem 0rem 13rem 0rem'}
      w={'100%'}
    >
      <Head>
        <title>홈 화면</title>
      </Head>
      <ThreeJSBox>
        <MyRoom />
      </ThreeJSBox>
      <FooterBox>
        <Footer />
      </FooterBox>
    </CC.ColCenterStartBox>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};

const ThreeJSBox = styled(CC.RowCenterDiv)`
  height: 30rem;
  padding: 0rem 3rem;
`;

const FooterBox = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
`;
