import { UserAPI } from '@api/UserAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import { UserLoginYup } from '@components/yup/UserLoginYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import authAction from '@redux/store/auth/actions';
import { CC } from '@styles/commonComponentStyle';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { Icons } from '../icons/Icons';
import Image from 'next/image';
import toastifyAction from '@redux/store/toastify/actions';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file LoginModal.tsx
 * @version 0.0.1 "2023-09-24 13:50:42"
 * @description 설명
 */
const LoginModal = (props: { changeAuthScreen: () => void, closeModal: () => void }) => {
  const queryClient = useQueryClient();
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

  
  const oauthLogin = async (oauthService: string) => {
    if(oauthService == 'kakao') {
      window.open(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&prompt=login
      `,"","width=400, height=600");
    }
    if(oauthService == 'google') {
      window.open(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&prompt=login
      `,"","width=400, height=600");
    }
    if(oauthService == 'facebook') {
      window.open(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&prompt=login
      `,"","width=400, height=600");
    }
    if(oauthService == 'github') {
      window.open(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&prompt=login
      `,"","width=400, height=600");
    }
    if(oauthService == 'naver') {
      window.open(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&prompt=login
      `,"","width=400, height=600");
    }
      const func = () => {
            queryClient.fetchQuery(['authUserInfo']).then((data: unknown)=>{
              store.dispatch(authAction.SET_ACCESS_TOKEN(data.json.user.accessToken));
              store.dispatch(
                authAction.SET_USER_INFO({
                  email: data.json.user.email,
                  role: data.json.user.role,
                  nickname: data.json.user.nickname,
                  id: data.json.user.id,
                  suid: data.json.user.suid,
                }),
                ); 
              });
              props.closeModal();
              store.dispatch(toastifyAction.SET_TOASTIFY_MESSAGE({
                type: "success",
                message: "카카오 로그인 성공"
              }))
            }
            // 만일 로그인하지 않고 화면을 닫아버리게 되면 eventListener가 남아있는 문제가 있으므로 재 접속시 제거
      window.document.removeEventListener("oauthLogin",func); 
      window.document.addEventListener("oauthLogin",func, { once: true }); 
    }

  return (
    <Container>
      <Header>
        <span>로그인</span>
        <span> 로그인을 하시면 일정과 할일 메뉴를 사용할 수 있습니다. </span>
      </Header>
      <CC.ColumnDiv gap={28}>
        <Input
          placeholder="이메일"
          type="email"
          register={register('email')}
          onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.email?.message}
          h={'2.4rem'}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          register={register('password')}
          onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.password?.message}
          h={'2.4rem'}
        />
      </CC.ColumnDiv>
      <CC.ColumnDiv gap={8}>
        <CC.RowCenterDiv gap={8}>
          <span>아이디가 없으시다면?</span>
          <Button
            onClickCapture={() => props.changeAuthScreen()}
            pd={'0rem 0.8rem'}
            bg={'white80'}
            h={'2rem'}
          >
            회원가입
          </Button>
        </CC.RowCenterDiv>
        <CC.RowCenterCenterBox gap={"8"}>
        <Button 
          w={'max-content'}
          onClick={() => {
            oauthLogin("kakao");
          }}>
          <CC.ImgContainer w={'40px'}>
              <Image
              alt={""}
              src={Icons.KakaoIcon}
              width={"1"} height={"1"}
              />
            </CC.ImgContainer>
            </Button>
        <Button 
          w={'max-content'}
          onClick={() => {
            oauthLogin("google");
          }}>
          <CC.ImgContainer w={'40px'}>
              <Image
              alt={""}
              src={Icons.KakaoIcon}
              width={"1"} height={"1"}
              />
            </CC.ImgContainer>
            </Button>
        <Button 
          w={'max-content'}
          onClick={() => {
            oauthLogin("facebook");
          }}>
          <CC.ImgContainer w={'40px'}>
              <Image
              alt={""}
              src={Icons.KakaoIcon}
              width={"1"} height={"1"}
              />
            </CC.ImgContainer>
            </Button>
        <Button 
          w={'max-content'}
          onClick={() => {
            oauthLogin("github");
          }}>
          <CC.ImgContainer w={'40px'}>
              <Image
              alt={""}
              src={Icons.KakaoIcon}
              width={"1"} height={"1"}
              />
            </CC.ImgContainer>
            </Button>
        <Button 
          w={'max-content'}
          onClick={() => {
            oauthLogin("naver");
          }}>
          <CC.ImgContainer w={'40px'}>
              <Image
              alt={""}
              src={Icons.KakaoIcon}
              width={"1"} height={"1"}
              />
            </CC.ImgContainer>
            </Button>
            </CC.RowCenterCenterBox>
        <Button
          w={'100%'}
          h={'2.4rem'}
          outline={true}
          onClickCapture={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          pd={'0.2rem 0.8rem'}
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
  padding: 0.4rem;
  gap: 0.6rem;
  color: ${(props) => props.theme.colors.white80};
  overflow: scroll;
  font-size: 1rem;
`;

const Header = styled.header`
  ${(props) => props.theme.flex.column};
  gap: 0.4rem;
  align-self: stretch;
  border-radius: ${(props) => props.theme.borderRadius.br10};
  padding: 0.2rem;

  span:nth-of-type(1) {
    /* font-family: ${(props) => props.theme.fontFamily.cookieRunRegular}; */
    font-size: 2rem;
  }

  span:nth-of-type(2) {
    color: ${(props) => props.theme.colors.black40};
  }
`;
