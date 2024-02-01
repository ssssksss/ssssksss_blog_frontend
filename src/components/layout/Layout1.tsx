import styled from '@emotion/styled';
import { store } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { rootActions } from '@/redux/store/actions';
import { useRouter } from 'next/router';
// import PageTransitions from ".@/components/common/reactTransitionGroup/PageTransitions";

type AppLayoutProps = {
  children: React.ReactNode;
};

// 블로그 용도의 레이아웃
const Layout1 = ({ children }: AppLayoutProps) => {
  const isLoading = useSelector(state => state.loadingStore.value);
  const router = useRouter();
  useEffect(() => {
    const start = () => {
      store.dispatch(rootActions.loadingStore.setIsLoading(true));
    };
    const end = () => {
      store.dispatch(rootActions.loadingStore.setIsLoading(false));
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <Spinner32 />
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner32 = styled.div`
  --box-size: 160px;
  & {
    width: var(--box-size);
    height: var(--box-size);
    display: inline-block;
    position: relative;
    transform: rotate(45deg);
  }
  &::before {
    content: '';
    box-sizing: border-box;
    width: calc(var(--box-size) / 2);
    height: calc(var(--box-size) / 2);
    position: absolute;
    left: 0;
    top: -calc(var(--box-size) / 2);
    animation: animloader 4s ease infinite;
  }
  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: calc(var(--box-size) / 2);
    height: calc(var(--box-size) / 2);
    /* background: rgba(255, 255, 255, 0.85); */
    /* 이게 이동하는 블럭 색상 */
    background: ${props => props.theme.main.primary80};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    animation: animloader2 2s ease infinite;
  }

  @keyframes animloader {
    0% {
      box-shadow: 0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0px var(--box-size) rgba(255, 255, 255, 0);
    }
    12% {
      box-shadow: 0 calc(var(--box-size) / 2)
          ${props => props.theme.main.secondary80},
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0px var(--box-size) rgba(255, 255, 255, 0);
    }
    25% {
      box-shadow: 0 calc(var(--box-size) / 2)
          ${props => props.theme.main.secondary80},
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          ${props => props.theme.main.secondary80},
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0px var(--box-size) rgba(255, 255, 255, 0);
    }
    37% {
      box-shadow: 0 calc(var(--box-size) / 2)
          ${props => props.theme.main.secondary80},
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          ${props => props.theme.main.secondary80},
        calc(var(--box-size) / 2) var(--box-size)
          ${props => props.theme.main.secondary80},
        0px var(--box-size) rgba(255, 255, 255, 0);
    }
    50% {
      box-shadow: 0 calc(var(--box-size) / 2)
          ${props => props.theme.main.secondary80},
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          ${props => props.theme.main.secondary80},
        calc(var(--box-size) / 2) var(--box-size)
          ${props => props.theme.main.secondary80},
        0px var(--box-size) ${props => props.theme.main.secondary80};
    }
    62% {
      box-shadow: 0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          ${props => props.theme.main.secondary80},
        calc(var(--box-size) / 2) var(--box-size)
          ${props => props.theme.main.secondary80},
        0px var(--box-size) ${props => props.theme.main.secondary80};
    }
    75% {
      box-shadow: 0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size)
          ${props => props.theme.main.secondary80},
        0px var(--box-size) ${props => props.theme.main.secondary80};
    }
    87% {
      box-shadow: 0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0px var(--box-size) ${props => props.theme.main.secondary80};
    }
    100% {
      box-shadow: 0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0px var(--box-size) rgba(255, 255, 255, 0);
    }
  }

  @keyframes animloader2 {
    0% {
      transform: translate(0, 0) rotateX(0) rotateY(0);
    }
    25% {
      transform: translate(100%, 0) rotateX(0) rotateY(180deg);
    }
    50% {
      transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg);
    }
    75% {
      transform: translate(0, 100%) rotateX(-180deg) rotateY(360deg);
    }
    100% {
      transform: translate(0, 0) rotateX(0) rotateY(360deg);
    }
  }
`;
