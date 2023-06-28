import theme from "@/styles/theme";
import styled from "@emotion/styled";
// import PageTransitions from "../common/reactTransitionGroup/PageTransitions";

type AppLayoutProps = {
  children: React.ReactNode;
};

// 블로그 용도의 레이아웃
const Layout1 = ({ children }: AppLayoutProps) => {
  return <Container>{children}</Container>;
};

export default Layout1;
const Container = styled.div`
  padding-left: 44px;
  padding-top: 44px;
  margin: auto;
  max-width: 1080px;

  @media (min-width: ${theme.deviceSizes.laptop}) {
    padding-left: 120px;
  }
`;
