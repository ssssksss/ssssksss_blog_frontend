const LoginModal = dynamic(
  () => import('@/components/common/modal/LoginModal'),
  {
    loading: () => <p>Loading...</p>,
  }
);

const AuthModal = dynamic(() => import('@/components/common/modal/AuthModal'), {
  loading: () => <p>Loading...</p>,
});

import { UserAPI } from '@/api/UserAPI';
import Button from '@/components/common/button/Button';
import ModalButton from '@/components/common/button/ModalButton';
import { Icons } from '@/components/common/icons/Icons';
import { store } from '@/redux/store';
import { rootActions } from '@/redux/store/actions';
import { RootState } from '@/redux/store/reducers';
import { useLoading } from '@/src/hooks/useLoading';
import { CC } from '@/styles/commonComponentStyle';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useReducer } from 'react';
import { useQueryClient } from 'react-query';
import { batch, useSelector } from 'react-redux';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TopBar.tsx
 * @version 0.0.1 "2023-09-20 10:42:16"
 * @description 설명
 */

const TopBar = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  const [isLoading, loadingFunction] = useLoading();
  const authUserInfo = UserAPI.getUser();
  const queryClient = useQueryClient();
  const [isHideBrowser, hideBrowserToggle] = useReducer(v => !v, true);

  //* 로그아웃 함수
  const signOutHandler = () => {
    (async () => {
      await AxiosInstance({
        url: '/api/user',
        method: 'DELETE',
      })
        .then(response => {
          store.dispatch(
            rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
              type: 'success',
              message: '로그아웃 되었습니다.',
            })
          );
          store.dispatch(
            rootActions.authStore.SET_USER_INFO({
              id: '',
              email: '',
              role: '',
              nickname: '',
            })
          );
          batch(() => {
            store.dispatch(rootActions.memoStore.SET_MEMO_LIST([]));
            store.dispatch(rootActions.memoStore.SET_MEMO_CATEGORY_LIST([]));
            store.dispatch(rootActions.todoStore.SET_TODO_LIST([]));
            store.dispatch(
              rootActions.authStore.SET_ACCESS_TOKEN({ accessToken: '' })
            );
            store.dispatch(
              rootActions.scheduleStore.SET_MONTH_SCHEDULE_LIST([])
            );
            store.dispatch(
              rootActions.scheduleStore.SET_TODAY_SCHEDULE_LIST([])
            );
          });
        })
        .catch(error => {});
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
      <Main>
        <Title>
          <Image
            src={Icons.LogoIcon}
            alt="logo"
            width={'36px'}
            height={'36px'}
          />
        </Title>
        {/* <Iframe hide={isHideBrowser} data={'https://www.bing.com/'}>
          iframe이 있었던 자리 입니다
        </Iframe> */}
        <CC.RowDiv gap={8}>
          {/* <ModalButton h={'100%'}>
              <Image
                src={Icons.MailIcon}
                alt="mail"
                onClick={() => alert('제작 계획 중')}
              />
            </ModalButton>
            <ModalButton h={'100%'}>
              <Image
                src={Icons.AlarmIcon}
                alt="alarm"
                onClick={() => alert('제작 계획 중')}
              />
            </ModalButton> */}
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
      </Main>
    </Container>
  );
};
export default TopBar;

const Container = styled.nav`
  height: 56px;
  padding: 4px;
`;

const Title = styled.h3`
  ${props => props.theme.fontFamily.gmarketSansBold};
  color: ${props => props.theme.main.primary80};
  padding-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Main = styled.div`
  display: flex;
  background: ${props => props.theme.main.contrast};
  height: 44px;
  border-radius: 10px;
  overflow: hidden;
  gap: 8px;
  padding: 4px 4px;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Iframe = styled.object<{ hide: boolean }>`
  z-index: 40;
  position: fixed;
  height: calc(100% - 180px);
  bottom: 80px;
  right: 40px;
  width: calc(70vw - 70px);
  background: ${props => props.theme.main.contrast};
  outline: solid ${props => props.theme.main.secondary80} 8px;
  visibility: ${props => (props.hide ? 'hidden' : 'visible')};
`;
