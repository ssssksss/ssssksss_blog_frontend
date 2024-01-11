import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import Button from '@/components/common/button/Button';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import ModalButton from '@/components/common/button/ModalButton';
import LoginModal from '../common/modal/LoginModal';
import AuthModal from '../common/modal/AuthModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { store } from '@/redux/store';
import { setAccessToken, setUserInfo } from '@/redux/store/auth';
import { useEffect } from 'react';
import { useLoading } from '@/src/hooks/useLoading';
import { Spinner1 } from '../spinner/Spinners';
import { UserAPI } from '@/api/UserAPI';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TopBar.tsx
 * @version 0.0.1 "2023-09-20 10:42:16"
 * @description 설명
 */
const TopBar = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  const [isLoading, loadingFunction] = useLoading();

  //* 로그아웃 함수
  const signOutHandler = () => {
    (async () => {
      await AxiosInstance({
        url: '/api/user',
        method: 'DELETE',
      })
        .then(response => {
          store.dispatch(
            setUserInfo({
              email: '',
              role: '',
              nickname: '',
            })
          );
          store.dispatch(setAccessToken({ accessToken: '' }));
        })
        .catch(error => {});
    })();
  };

  useEffect(() => {
    // console.log('TopBar.tsx 파일 ======= : ');
    // //* 처음 페이지에 들어오면 사용자의 정보를 받아오는 함수
    loadingFunction(
      UserAPI.getUser()
        .then(response => {
          store.dispatch(setUserInfo(response.data.user));
          store.dispatch(setAccessToken(response.data.user.accessToken));
        })
        .catch(error => {
          // console.log('TopBar.tsx 파일 에러 : ', error);
        })
    );
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Spinner1 />
      ) : (
        <Main>
          <Title> 가출한토토로의 블로그 </Title>
          <CC.RowDiv gap={8}>
            <ModalButton h={'100%'}>
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
            </ModalButton>
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
                    modalW={'400px'}
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
      )}
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
`;
