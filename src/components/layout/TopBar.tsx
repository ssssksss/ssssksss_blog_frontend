const AuthModal = dynamic(() => import('@components/common/modal/AuthModal'), {
  loading: () => <p>Loading...</p>,
});

import { UserAPI } from '@api/UserAPI';
import Button from '@components/common/button/Button';
import ModalButton from '@components/common/button/ModalButton';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { useLoading } from '@hooks/useLoading';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { SET_LEFT_NAV_ITEM_ACTIVE } from '@redux/store/leftNav';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import AxiosInstance from '@utils/axios/AxiosInstance';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';
import { batch, useSelector } from 'react-redux';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TopBar.tsx
 * @version 0.0.1 "2023-09-20 10:42:16"
 * @description 설명
 */

const TopBar = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  const [isHideBrowser, hideBrowserToggle] = useReducer((v) => !v, true);
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
            store.dispatch(rootActions.todoStore.SET_TODO_LIST([]));
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

  useEffect(async () => {
    // ctrl + space를 누르면 bing이 나온다. 사용하기전에 브라우저에 가서 설정을 해주어야 한다.
    let keyDownEventFunc = (e: Event) => {
      if (e.which === 32 && e.ctrlKey) {
        hideBrowserToggle();
      }
    };
    window.addEventListener('keydown', keyDownEventFunc);

    return () => {
      window.removeEventListener('keydown', keyDownEventFunc);
    };
  }, []);

  return (
    <Container>
      <Link href={`/`} prefetch={false}>
        <Image
          className={'logo'}
          src={Icons.LogoIcon}
          alt="logo"
          width={'36px'}
          height={'36px'}
          onClick={() => {
            store.dispatch(SET_LEFT_NAV_ITEM_ACTIVE('/'));
          }}
        />
      </Link>
      {typeof window != 'undefined' && (
        <Iframe
          title="Helpful Widget"
          hide={isHideBrowser}
          src={'https://blog.ssssksss.xyz'}
          loading="lazy"
        >
          iframe이 있었던 자리 입니다
        </Iframe>
      )}
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
export default TopBar;

const Container = styled.div`
  display: flex;
  background: ${(props) => props.theme.main.contrast};
  min-height: 44px;
  height: 44px;
  border-radius: 10px;
  overflow: hidden;
  gap: 8px;
  padding: 4px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: 4px;

  .logo {
    cursor: pointer;
  }
`;

const Iframe = styled.iframe<{ hide: boolean }>`
  z-index: 40;
  position: fixed;
  height: calc(100% - 180px);
  bottom: 80px;
  right: 40px;
  width: calc(70vw - 70px);
  background: ${(props) => props.theme.main.contrast};
  outline: solid ${(props) => props.theme.main.secondary80} 8px;
  visibility: ${(props) => (props.hide ? 'hidden' : 'visible')};
`;
