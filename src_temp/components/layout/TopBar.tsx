import Button from '@components/common/button/Button';
import ModalButton from '@components/common/button/ModalButton';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import authAction from '@redux/store/auth/actions';
import { SET_LEFT_NAV_ITEM_ACTIVE } from '@redux/store/leftNav';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { throttle } from 'lodash';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IUser } from 'src/@types/auth/user';
import SideBar from './SideBar';

const AuthModal = dynamic(() => import('@components/common/modal/AuthModal'), {
  loading: () => <p>Loading...</p>,
});


const TopBar = () => {
  const reactPlayerStore = useSelector(
    (state: RootState) => state.reactPlayerStore,
  );
  const authStore = useSelector((state: RootState) => state.authStore);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    // 처음 및 새로고침시 로그인 작업,  accessToken 저장 및 사용자 정보 저장하기
    if (!authStore.id) {
      const temp = async () => {
        await AxiosInstance.get("/api/user", {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`
          },
          withCredentials: true
        }).then((res) => {
          const _user: IUser = res.data.data.user;
          store.dispatch(authAction.SET_ACCESS_TOKEN(_user.accessToken));
          store.dispatch(
            rootActions.blogStore.setActiveBlogUserId(_user.id),
          );
          store.dispatch(
            authAction.SET_USER_INFO({
              email: _user.email,
              role: _user.role,
              nickname: _user.nickname,
              id: _user.id,
            }),
          );
        }).catch(() => {})
      }
      temp();
    }

    // 유튜브 제목 로컬스토리지에서 꺼내오기
    store.dispatch(
      rootActions.reactPlayerStore.setYoutubeTitle(
        window.localStorage.getItem('youtubeTitle'),
      )
    )
  },[])

  const updateProgressBar = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollWidth(scrolled);
  };

  const throttledUpdateProgressBar = throttle(updateProgressBar, 100);

  useEffect(() => {
    window.addEventListener('scroll', throttledUpdateProgressBar);
    return () => {
      window.removeEventListener('scroll', throttledUpdateProgressBar);
      throttledUpdateProgressBar.cancel(); // Clean up the throttle function
    };
  }, [throttledUpdateProgressBar]);
  
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
        withCredentials: true,
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
              email: '',
              role: '',
              nickname: '',
            }),
          );
          store.dispatch(rootActions.authStore.SET_ACCESS_TOKEN(''));
          store.dispatch(rootActions.scheduleStore.SET_MONTH_SCHEDULE_LIST([]));
          store.dispatch(rootActions.scheduleStore.SET_TODAY_SCHEDULE_LIST([]));
        })
        .catch(() => {});
    })();
  };

  return (
    <Container id={'top-bar'}>
      <ProgressBar style={{ width: `${scrollWidth}%` }}></ProgressBar>
      <CC.RowBetweenCenterBox
        outline={1}
        h={'100%'}
        pd={'0.5rem'}
        bg={'primary20'}
      >
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
          {!!authStore.id && (
            <div
              className={'w-[1.5rem] aspect-square px-[.5rem]'}
              onClick={() => {
                store.dispatch(
                  rootActions.reactPlayerStore.setYoutubePlay(
                    !reactPlayerStore.youtubePlay,
                  ),
                );
              }}
            >
              {reactPlayerStore.youtubePlay ? (
                <FontAwesomeIcon icon={faPause} />
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
            </div>
          )}
        </CC.RowDiv>
        <CC.RowDiv>
          {authStore.id ? (
            <Button
              color={'secondary80'}
              outline={1}
              fontWeight={600}
              onClick={() => signOutHandler()}
              pd={'0.25rem'}
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
              pd={'0.25rem'}
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

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 0.375rem;
  background: ${(props) =>
    `linear-gradient(90deg, ${props.theme.main.primary80} 0%, ${props.theme.main.secondary80} 100%)`};
`;
