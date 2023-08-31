import Button from '@/components/common/button/Button';
import { CC } from '@/styles/commonComponentStyle';
import { useState } from 'react';
import styled from '@emotion/styled';
import PostDeleteListContainer from '../Post/PostDeleteListContainer';
import PortfolioContainer from './portfolioContainer/PortfolioContainer';

/**
 * Author : Sukyung Lee
 * FileName: UserDashBoardContainer.tsx
 * Date: 2022-09-18 00:33:34
 * Description :
 */
const UserDashBoardContainer = () => {
  const [menu, setMenu] = useState('home');

  return (
    <Container>
      <CC.ColumnDiv gap={10} padding={'0px 10px'}>
        <Button onClick={() => setMenu('home')}> 홈 </Button>
        <Button onClick={() => setMenu('postRemoveList')}>
          게시글 삭제 목록
        </Button>
        <Button onClick={() => setMenu('portfolio')}> 포트폴리오 </Button>
      </CC.ColumnDiv>
      <CC.RowDiv>
        {menu === 'home' && <></>}
        {menu === 'postRemoveList' && <PostDeleteListContainer />}
        {menu === 'portfolio' && <PortfolioContainer />}
      </CC.RowDiv>
    </Container>
  );
};
export default UserDashBoardContainer;

const Container = styled(CC.RowDiv)`
  background: #e2e3f5;
  border-radius: 10px;
  margin-bottom: 10px;
  gap: 10px;
  padding: 10px;

  & > div:nth-of-type(1) {
    width: 300px;
    padding: 10px;
    background-color: #aeaeae;
    border-radius: 10px;
  }
  & > div:nth-of-type(2) {
    width: calc(100% - 300px);
    padding: 10px;
    background-color: #aeaeae;
    border-radius: 10px;
  }
`;
