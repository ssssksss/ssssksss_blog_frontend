import { UserAPI } from '@api/UserAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import { UserLoginYup } from '@components/yup/UserLoginYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { CC } from '@styles/commonComponentStyle';
import AxiosInstance from '@utils/axios/AxiosInstance';
import StringFunction from '@utils/function/stringFunction';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Icons } from '../icons/Icons';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file LoginModal.tsx
 * @version 0.0.1 "2023-09-24 13:50:42"
 * @description 설명
 */
const LoginModal = (props: { changeAuthScreen: () => void, closeModal: () => void }) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(UserLoginYup),
    mode: 'onChange',
    defaultValues: {
      password: 'P@ssw0rd!',
      email: 'test@naver.com',
    },
  });
  const { errors } = formState;
  const signInMutate = UserAPI.signInUser();
  const onClickSubmit = async (data: unknown) => {
    signInMutate({
      email: data.email,
      password: data.password,
    });
  };

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };
  const _func = async (event: Event & {detail: {accessToken: string}}) => {
    // 로그인 후에 백엔드 과정까지 거치고 난뒤에 실행되는 함수
    store.dispatch(rootActions.authStore.SET_ACCESS_TOKEN(event.detail.accessToken));
    AxiosInstance({
      url: '/api/user',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${event.detail.accessToken}`,
      },
    }).then((response) => {
      store.dispatch(rootActions.authStore.SET_USER_INFO(response.data.data.user));
      store.dispatch(rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
          type: "success",
          message: "로그인 성공"
        }))
    });
  }
  
  const oauthLogin = async (oauthService: string) => {
    if(oauthService == 'kakao') {
      window.open(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}&prompt=login
      `,"","");
    }
    if(oauthService == 'google') {
      window.open(`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&scope=email profile&prompt=select_account
      `,"","");
    }
    if(oauthService == 'facebook') {
      window.open(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}&prompt=login
      `,"","");
    }
    if(oauthService == 'github') {
      window.open(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}&prompt=login
      `,"","");
    }
    if(oauthService == 'naver') {
      window.open(`https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NAVER_REDIRECT_URL}&state=${StringFunction.generateRandomString(20)}&auth_type=reauthenticate`,"","");
    }
      // 만일 로그인하지 않고 화면을 닫아버리게 되면 eventListener가 남아있는 문제가 있으므로 재 접속시 제거
      window.document.removeEventListener("oauthLogin",_func); 
      window.document.addEventListener("oauthLogin",_func, { once: true }); 
    }
    
    useEffect(()=>{
      return () => {
        window.document.removeEventListener("oauthLogin",_func); 
      }
    },[])

  return (
    <Container>
      <Header>
        <span>로그인</span>
      </Header>
      <CC.ColBox gap={24} pd={'0px 0px 1rem 0px'}>
        <Input
          placeholder="이메일"
          type="email"
          bg={'gray20'}
          pd={'0px 0px 0px 0.5rem'}
          register={register('email')}
          onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.email?.message}
          h={'2.4rem'}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          bg={'gray20'}
          pd={'0px 0px 0px 0.5rem'}
          register={register('password')}
          onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.password?.message}
          h={'2.4rem'}
        />
      </CC.ColBox>
      <CC.ColumnDiv gap={8}>
        <CC.RowCenterDiv gap={8}>
          <span>아이디가 없으시다면?</span>
          <Button
            onClickCapture={() => props.changeAuthScreen()}
            pd={'0rem 0.5rem'}
            bg={'primary80'}
            color={'white80'}
            h={'1.5rem'}
          >
            회원가입
          </Button>
        </CC.RowCenterDiv>
        <CC.RowCenterCenterBox gap={'8'}>
          <Button
            w={'max-content'}
            onClick={() => {
              oauthLogin('kakao');
            }}
          >
            <CC.ImgContainer w={'40px'}>
              <Image alt={''} src={Icons.KakaoIcon} width={'1'} height={'1'} />
            </CC.ImgContainer>
          </Button>
          <Button
            w={'max-content'}
            onClick={() => {
              oauthLogin('google');
            }}
          >
            <CC.ImgContainer w={'40px'}>
              <Image
                alt={''}
                src={Icons.GoogleLoginSmallIcon}
                width={'1'}
                height={'1'}
              />
            </CC.ImgContainer>
          </Button>
          <Button
            w={'max-content'}
            onClick={() => {
              oauthLogin('naver');
            }}
          >
            <CC.ImgContainer w={'40px'}>
              <Image alt={''} src={Icons.NaverIcon} width={'1'} height={'1'} />
            </CC.ImgContainer>
          </Button>
        </CC.RowCenterCenterBox>
        <Button
          w={'100%'}
          h={'2.4rem'}
          pd={'0.5rem'}
          outline={true}
          onClickCapture={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          disabled={!formState.isValid}
        >
          로그인
        </Button>
      </CC.ColumnDiv>
    </Container>
  );
};
export default LoginModal;

const Container = styled(CC.ColumnDiv)`
  padding: 0.5rem;
  gap: 0.5rem;
  overflow: scroll;
  font-size: 1rem;
`;

const Header = styled.header`
  ${(props) => props.theme.flex.column};
  gap: 0.5rem;
  align-self: stretch;
  border-radius: ${(props) => props.theme.borderRadius.br10};
  padding: 0.5rem;

  span:nth-of-type(1) {
    font-size: 2rem;
  }

  span:nth-of-type(2) {
    color: ${(props) => props.theme.colors.black40};
  }
`;
