const AuthModal = dynamic(() => import('@components/common/modal/AuthModal'), {
  loading: () => <p>Loading...</p>,
});

import { UserAPI } from '@api/UserAPI';
import Button from '@components/common/button/Button';
import ModalButton from '@components/common/button/ModalButton';
import { Icons } from '@components/common/icons/Icons';
import { useLoading } from '@components/useHook/useLoading';
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
import { batch, useSelector } from 'react-redux';

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
    (async () => {
      await AxiosInstance({
        url: '/api/user',
        method: 'DELETE',
      })
        .then((_) => {
          store.dispatch(
            rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
              type: 'success',
              message: '로그아웃 되었습니다.',
            }),
          );
          store.dispatch(
            rootActions.authStore.SET_USER_INFO({
              id: '',
              email: '',
              role: '',
              nickname: '',
            }),
          );
          batch(() => {
            store.dispatch(rootActions.memoStore.SET_MEMO_LIST([]));
            store.dispatch(rootActions.memoStore.SET_MEMO_CATEGORY_LIST([]));
            store.dispatch(
              rootActions.authStore.SET_ACCESS_TOKEN({ accessToken: '' }),
            );
            store.dispatch(
              rootActions.scheduleStore.SET_MONTH_SCHEDULE_LIST([]),
            );
            store.dispatch(
              rootActions.scheduleStore.SET_TODAY_SCHEDULE_LIST([]),
            );
          });
        })
        .catch((_) => {});
    })();
  };

  return (
    <Container>
      <Link href={`/`} prefetch={false}>
        <Image
          className={'logo'}
          src={Icons.LogoIcon}
          alt="logo"
          width={'36'}
          height={'36'}
          onClick={() => {
            store.dispatch(SET_LEFT_NAV_ITEM_ACTIVE('/'));
          }}
        />
      </Link>
      <CC.RowDiv gap={8}>
        {useLoading ? (
          <>
            {authStore.email ? (
              <Button
                color={'secondary80'}
                outline={'true'}
                pd={'4px'}
                fontWeight={600}
                onClick={() => signOutHandler()}
              >
                Sign Out
              </Button>
            ) : (
              <ModalButton
                modal={<AuthModal />}
                modalW={'360px'}
                modalMaxW={'400px'}
                w={'max-content'}
                h={'100%'}
                color={'secondary80'}
                outline={'true'}
                pd={'4px'}
                fontWeight={600}
              >
                Sign In / Sign up
              </ModalButton>
            )}
          </>
        ) : (
          <div> 로딩중 </div>
        )}
      </CC.RowDiv>
    </Container>
  );
};
export default React.memo(TopBar);

const Container = styled.div`
  display: flex;
  background: ${(props) => props.theme.main.contrast};
  height: 44px;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding: 4px;
  z-index: 20;
  border-bottom: solid ${(props) => props.theme.main.primary20} 2px;

  .logo {
    cursor: pointer;
  }
`;

// const Iframe = styled.iframe<{ hide: boolean }>`
//   z-index: 40;
//   position: fixed;
//   height: calc(100% - 180px);
//   bottom: 80px;
//   right: 40px;
//   width: calc(70vw - 70px);
//   background: ${(props) => props.theme.main.contrast};
//   outline: solid ${(props) => props.theme.main.secondary80} 8px;
//   visibility: ${(props) => (props.hide ? 'hidden' : 'visible')};
// `;
