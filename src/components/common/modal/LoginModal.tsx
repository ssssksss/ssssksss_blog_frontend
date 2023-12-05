import { CC } from '@/styles/commonComponentStyle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import ModalButton from '@/components/common/button/ModalButton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserLoginYup } from '@/components/yup/UserLoginYup';
import { store } from '@/redux/store';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { setAccessToken, setUserInfo } from '@/redux/store/auth/actions';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file LoginModal.tsx
 * @version 0.0.1 "2023-09-24 13:50:42"
 * @description 설명
 */
const LoginModal = props => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(UserLoginYup),
    mode: 'onChange',
    defaultValues: {
      password: '',
      email: '',
    },
  });
  const { errors } = formState;

  const onClickSubmit = async (data: any) => {
    const { passwordConfirm, ...params } = data;
    let toastifyMessage = '';
    let toastifyType = 'success';

    await AxiosInstance({
      url: '/api/user',
      method: 'PUT',
      data: {
        email: params.email,
        password: params.password,
      },
    })
      .then((response: any) => {
        store.dispatch(setAccessToken(response.data.accessToken));
        AxiosInstance({
          url: '/api/user',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`,
          },
        })
          .then(response => {
            store.dispatch(setUserInfo(response.data.data.user));
            toastifyType = 'success';
            toastifyMessage = '로그인을 완료했습니다.';
            props.closeModal();
          })
          .catch(error => {
            toastifyType = 'error';
            toastifyMessage = '에러';
            console.log('UserLogin.tsx : ', error.response);
          })
          .finally(() => {
            store.dispatch(
              SET_TOASTIFY_MESSAGE({
                type: toastifyType,
                message: toastifyMessage,
              })
            );
          });
      })
      .catch((error: any) => {
        console.log('LoginModal.tsx 파일 : ', error.response);
        toastifyMessage = error.response?.data?.errorMsg;
        store.dispatch(
          SET_TOASTIFY_MESSAGE({
            type: 'error',
            message: '로그인 실패',
          })
        );
      });
  };

  const onClickErrorSubmit = () => {
    console.log('LoginModal.tsx 파일 : ???');
    alert('잘못 입력된 값이 존재합니다.');
  };

  return (
    <Container>
      <Header>
        <span>
          가출한토토로의 블로그에 <br /> 오신것을 환영합니다.{' '}
        </span>
        <span> 로그인을 하시면 일정과 할일 메뉴를 사용할 수 있습니다. </span>
      </Header>
      <CC.ColumnDiv gap={28}>
        <Input
          placeholder="이메일"
          styleTypes={1}
          type="email"
          register={register('email')}
          onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.email?.message}
        />
        <Input
          placeholder="비밀번호"
          styleTypes={1}
          type="password"
          register={register('password')}
          onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.password?.message}
        />
      </CC.ColumnDiv>
      <CC.ColumnDiv gap={8}>
        <CC.RowCenterDiv gap={20}>
          <Image src={Icons.GoogleIcon} alt="google" />
          <Image src={Icons.KakaoIcon} alt="kakao" />
        </CC.RowCenterDiv>
        <CC.RowCenterDiv gap={8}>
          <span>아이디가 없으시다면?</span>
          <Button
            onClickCapture={() => props.changeAuthScreen()}
            styleTypes={1}
            pd={'2px 8px'}
          >
            회원가입
          </Button>
        </CC.RowCenterDiv>
        <Button
          w={'100%'}
          h={'40px'}
          outline={true}
          styleTypes={1}
          onClickCapture={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          pd={'2px 8px'}
        >
          로그인
        </Button>
      </CC.ColumnDiv>
    </Container>
  );
};
export default LoginModal;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  padding: 40px 10px 10px 10px;
  gap: 28px;
  color: ${props => props.theme.colors.white80};
`;

const commonStyle = css`
  border: 1px solid #fff;
  background: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(1px);
`;

const Header = styled.header`
  ${props => props.theme.flex.column};
  padding: 16px;
  gap: 0.25rem;
  align-self: stretch;
  border-radius: ${props => props.theme.borderRadius.br10};
  ${commonStyle};

  span:nth-of-type(1) {
    /* font-family: ${props => props.theme.fontFamily.cookieRunRegular}; */
    font-size: 20px;
  }

  span:nth-of-type(2) {
    color: ${props => props.theme.colors.black40};
  }
`;
