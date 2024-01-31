import styled from '@emotion/styled';
import { Spinner1 } from '../spinner/Spinners';
import { store } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setIsLoading } from '@/redux/store/loading';
// import PageTransitions from ".@/components/common/reactTransitionGroup/PageTransitions";

type AppLayoutProps = {
  children: React.ReactNode;
};

// 블로그 용도의 레이아웃
const Layout1 = ({ children }: AppLayoutProps) => {
  const isLoading = useSelector(state => state.loadingStore.value);

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <Spinner1 />
        </LoadingContainer>
      ) : (
        <Container1>{children}</Container1>
      )}
    </Container>
  );
};

export default Layout1;
const Container = styled.div`
  padding: 4px;
  border-radius: ${props => props.theme.borderRadius.br10};
  height: 100%;
  position: relative;
`;

const Container1 = styled.div`
  max-width: 1440px;
  /* LeftBar.tsx에 있는 너비와 맞추어주어야 한다. */
  /* 마진 5px * 2 + leftBar(44px) */
  width: calc(100vw - 52px);
  @media (min-width: ${props => props.theme.deviceSizes.pc}) {
    width: calc(100vw - 130px);
    margin: auto;
  }

  & > div {
    --top-navbar-height: 64px;
    max-height: calc(100vh - var(--top-navbar-height));
    padding: 2px;
    @media (pointer: coarse) {
      max-height: calc(100vh - var(--top-navbar-height) - 44px);
    }
  }
`;

const LoadingContainer = styled.div`
  position: absolute;
  width: 50%;
  aspect-ratio: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
