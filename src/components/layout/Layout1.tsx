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
  padding-left: 44px;
  padding-top: 44px;
  margin: auto;
  max-width: 1440px;

  @media (min-width: ${theme.deviceSizes.tablet}) {
    padding-left: 120px;
  }
`;
