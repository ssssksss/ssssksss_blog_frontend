import styled from '@emotion/styled';
import { CC } from '@/styles/commonComponentStyle';
import dynamic from 'next/dynamic';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file NavBar.tsx
 * @version 0.0.1 "2023-09-20 10:40:44"
 * @description 설명
 */

const SideBar = dynamic(() => import('@/components/layout/SideBar'), {
  loading: () => <p>Loading...</p>,
});

const TopBar = dynamic(() => import('@/components/layout/TopBar'), {
  loading: () => <p>Loading...</p>,
});

const NavBar = ({ children }) => {
  return (
    <Container id="nav">
      <SideBar />
      <CC.ColumnDiv w={'100%'} h={'100%'}>
        <TopBar />
        <Main>{children}</Main>
      </CC.ColumnDiv>
    </Container>
  );
};
export default NavBar;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: ${props => props.theme.main.primary20};
  ${props => props.theme.flex.row};
  @media (pointer: coarse) {
    height: calc(100vh - 80px);
  }
`;
const Main = styled.main`
  height: 100%;
`;
