const AuthModal = dynamic(() => import('@components/common/modal/AuthModal'), {
  loading: () => <p>Loading...</p>,
});

import { UserAPI } from '@api/UserAPI';
import Button from '@components/common/button/Button';
import ModalButton from '@components/common/button/ModalButton';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { SET_LEFT_NAV_ITEM_ACTIVE } from '@redux/store/leftNav';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import AxiosInstance from '@utils/axios/AxiosInstance';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import SideBar from './SideBar';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TopBar.tsx
 * @version 0.0.1 "2023-09-20 10:42:16"
 * @description 설명
 */

const TopBar = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  UserAPI.getUser();

  //* 로그아웃 함수
  const signOutHandler = () => {
    // if(store.getState().authStore.suid.split("_")[0] == "kakao") { }
    // else if(store.getState().authStore.suid.split("_")[0] == "naver") {

    // }
    // else if(store.getState().authStore.suid.split("_")[0] == "google") {

    // }
    (async () => {
      await AxiosInstance({
        url: '/api/user',
        method: 'DELETE',
      })
        .then(() => {
          store.dispatch(
            rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
              type: 'success',
              message: '로그아웃 되었습니다.',
            }),
          );
          store.dispatch(
            rootActions.authStore.SET_USER_INFO({
              id: null,
              email: '',
              role: '',
              nickname: '',
              suid: '',
            }),
          );
          store.dispatch(rootActions.memoStore.SET_MEMO_LIST([]));
          store.dispatch(rootActions.memoStore.SET_MEMO_CATEGORY_LIST([]));
          store.dispatch(rootActions.authStore.SET_ACCESS_TOKEN(''));
          store.dispatch(rootActions.scheduleStore.SET_MONTH_SCHEDULE_LIST([]));
          store.dispatch(rootActions.scheduleStore.SET_TODAY_SCHEDULE_LIST([]));
        })
        .catch(() => {});
    })();
  };

  return (
    <Container id={'top-bar'}>
      <CC.RowBetweenCenterBox outline={1} h={'100%'} pd={'0.5rem'} bg={"primary20"}>
        <CC.RowDiv>
          <SideBar />
          <CC.ImgContainer h={'100%'} w={'44px'}>
            <Link href={`/`} prefetch={false}>
              <Image
                id={'logo'}
                src={Icons.LogoIcon}
                alt="logo"
                fill
                onClick={() => {
                  store.dispatch(SET_LEFT_NAV_ITEM_ACTIVE('/'));
                }}
              />
            </Link>
          </CC.ImgContainer>
        </CC.RowDiv>
        <CC.RowDiv>
          {authStore.id ? (
            <Button
              color={'secondary80'}
              outline={1}
              fontWeight={600}
              onClick={() => signOutHandler()}
              pd={'0rem 0.125rem'}
            >
              Sign Out
            </Button>
          ) : (
            <ModalButton
              modal={<AuthModal />}
              modalW={'90vw'}
              modalMaxW={'60rem'}
              w={'max-content'}
              outline={1}
              modalOverlayVisible={true}
              fontWeight={600}
              pd={'0rem 0.125rem'}
            >
              Sign In / Sign up
            </ModalButton>
          )}
        </CC.RowDiv>
      </CC.RowBetweenCenterBox>
    </Container>
  );
};
export default React.memo(TopBar);

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.5rem;
  width: 100vw;
  height: 4rem;
  gap: 0.5rem;
  z-index: 10;
  background: linear-gradient(180deg, white 87.5%, transparent 12.5%);
`;
