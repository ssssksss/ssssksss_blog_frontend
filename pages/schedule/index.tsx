import BlogLayout from '@/components/layout/BlogLayout';
import { store } from '@/redux/store';
import styled from '@emotion/styled';
import ScheduleSideContainer from '../../src/components/schedule/ScheduleSideContainer';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import { useState, useEffect, useCallback } from 'react';
import Button from '@/components/common/button/Button';
import ScheduleCalendarContainer from '@/components/schedule/Calendar/transh1';
import { useRouter } from 'next/router';
import theme from '@/styles/theme';
import LeftSideCalendarContainer from '@/components/schedule/LeftSideCalendarContainer';
import HeaderCalendarContainer from '@/components/schedule/HeaderCalendarContainer';
import MainCalendarContainer from '@/components/schedule/MainCalendarContainer';

/**
 * Author : Sukyung Lee
 * FileName: SchedulePage.tsx
 * Date: 2022-09-11 00:01:56
 * Description :
 */

const SchedulePage = () => {
  const isAuth = useSelector((state: RootState) => state.authStore.email);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const authStore = useSelector((state: RootState) => state.authStore);

  // const sideOpenToggleHandler = useCallback(() => {
  //   setIsOpen((prev) => !prev);
  //   if (isOpen === false) {
  //     // 모달창이 열리면 경로를 1개 추가하여 뒤로가기를 방지
  //     window.history.pushState(null, "", router.asPath);
  //   } else {
  //     // 모달창이 닫히면 뒤로가기를 실행하여 위에서 추가한 경로를 제거
  //     router.back();
  //   }
  // }, []);

  // const sideOpenToggleHandler = () => {
  //   setIsOpen(prev => !prev);
  //   if (isOpen === false) {
  //     // 모달창이 열리면 경로를 1개 추가하여 뒤로가기를 방지
  //     window.history.pushState(null, '', router.asPath);
  //   } else {
  //     // 모달창이 닫히면 뒤로가기를 실행하여 위에서 추가한 경로를 제거
  //     router.back();
  //   }
  // };

  const sideCloseHandler = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('popstate', sideCloseHandler);
    return () => {
      window.removeEventListener('popstate', sideCloseHandler);
    };
  }, []);

  return (
    <>
      {/* {isAuth ? (
        <Container>
          <LeftSideCalendarContainer />
          <CC.ColumnDiv>
            <HeaderCalendarContainer />
            <MainCalendarContainer />
          </CC.ColumnDiv>
          {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
        </Container>
      ) : (
        <div> 로그인이 필요합니다. </div>
      )} */}

      <Container>
        <LeftSideCalendarContainer />
        <CC.ColumnDiv>
          <HeaderCalendarContainer />
          <MainCalendarContainer />
        </CC.ColumnDiv>
        {/* <ScheduleCalendarContainer
            sideOpenToggleHandler={sideOpenToggleHandler}
          />
          <ScheduleSideContainer
            hide={!isOpen}
            sideOpenToggleHandler={sideOpenToggleHandler}
          /> */}
        {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
      </Container>
    </>
  );
};
export default SchedulePage;
SchedulePage.layout = BlogLayout;

const Container = styled.div`
  display: grid;
  min-height: calc(100vh - 44px);
  grid-template-columns: 300px auto;

  @media (max-width: ${theme.deviceSizes.laptop}) {
    grid-template-columns: 200px auto;
  }
`;

const Overlay = styled.button`
  position: absolute;
  background: #aeaeae;
  z-index: 8;
  opacity: 0.5;
  width: 100vw;
  min-height: 100%;
  cursor: pointer;
`;
