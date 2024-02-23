import Footer from '@/components/layout/Footer';
import styled from '@emotion/styled';
import Head from 'next/head';
import Layout1 from 'src/components/layout/Layout1';

const HomePage = ({ test }: any) => {
  return (
    <Container>
      <Head>
        <title> 홈 화면 </title>
      </Head>
      {/* <HomeThreejs />
      <Content /> */}
      <div> 홈 화면 아직 미구성 </div>
      <div>
        블로그는 실행했던 코드나 정리를 위한 블로그, 아직 설명용도의 블로그는
        아닙니다.
      </div>
      <Footer />
    </Container>
  );
};
HomePage.layout = Layout1;
export default HomePage;

const Container = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
`;
