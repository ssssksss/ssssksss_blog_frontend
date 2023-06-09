import theme from "@/styles/theme";
import styled from "@emotion/styled";
// import PageTransitions from "../common/reactTransitionGroup/PageTransitions";

type AppLayoutProps = {
  children: React.ReactNode;
};

// 블로그 용도의 레이아웃
const Layout1 = ({ children }: AppLayoutProps) => {
  return (
    <Container>
      {/*  */}
      <Container1>{children}</Container1>
      {/*  */}
    </Container>
  );
};

export default Layout1;
const Container = styled.div``;
const Container1 = styled.div`
  margin: auto;
  max-width: 1440px;
  /* margin-left: 60px; */

  /* @media (min-width: ${theme.deviceSizes.maxWidth}) {
    background: white;
    width: 300px;
    align-items: flex-start;
    margin-left: 300px;
  } */
`;
