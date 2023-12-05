import { CC } from '@/styles/commonComponentStyle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@/components/common/button/Button';
import { Shell } from '@/components/common/shell/Shell';
import { Input } from '@/components/common/input/Input';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import ModalButton from '@/components/common/button/ModalButton';
import { useEffect } from 'react';
import { UserSignupYup } from '@/components/yup/UserSignupYup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import AxiosInstance from '@/utils/axios/AxiosInstance';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file SignupModal.tsx
 * @version 0.0.1 "2023-09-24 14:22:40"
 * @description 설명
 */

const SignupModal = props => {
  const { register, handleSubmit, formState, watch, trigger } = useForm({
    resolver: yupResolver(UserSignupYup),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      password: '',
      passwordConfirm: '',
      email: '',
      gender: '',
      birthDate: '',
    },
  });
  const { errors } = formState;

  const onClickSubmit = async (data: any) => {
    const { passwordConfirm, ...params } = data;
    await AxiosInstance({
      url: '/api/user',
      method: 'POST',
      data: {
        nickname: params.nickname,
        password: params.password,
        email: params.email,
        gender: 'm',
        birthDate: '20000101',
      },
    })
      .then((response: any) => {
        store.dispatch(
          SET_TOASTIFY_MESSAGE({
            type: 'success',
            message: '회원가입을 완료했습니다.',
          })
        );
        props.closeModal();
      })
      .catch((error: any) => {
        alert(error.response.data.errorMsg);
      });
  };

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

  useEffect(() => {
    if (formState.touchedFields?.password) {
      trigger('password');
      trigger('passwordConfirm');
    }
  }, [watch('password')]);

  return (
    <Container>
      <Header>
        <span>
          가출한토토로의 블로그에 <br /> 오신것을 환영합니다.
        </span>
        <span>
          비밀번호는 암호화처리되며 <br /> 개인정보는 다른 곳에 사용되지
          않습니다.
        </span>
      </Header>
      <CC.ColumnDiv gap={28}>
        <Input
          placeholder="이메일"
          styleTypes={1}
          register={register('email')}
          errorMessage={errors.email?.message}
        />
        <Input
          placeholder="닉네임"
          styleTypes={1}
          register={register('nickname')}
          errorMessage={errors.nickname?.message}
        />
        <Input
          placeholder="비밀번호"
          styleTypes={1}
          register={register('password')}
          errorMessage={errors.password?.message}
          type="password"
        />
        <Input
          placeholder="비밀번호확인"
          styleTypes={1}
          register={register('passwordConfirm')}
          errorMessage={errors.passwordConfirm?.message}
          type="password"
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
            onClickCapture={e => {
              e.stopPropagation();
              props.changeAuthScreen();
            }}
            styleTypes={1}
            pd={'2px 8px'}
          >
            로그인
          </Button>
        </CC.RowCenterDiv>
        <Button
          w={'100%'}
          h={'40px'}
          outline={true}
          styleTypes={1}
          onClickCapture={handleSubmit(onClickSubmit, onClickErrorSubmit)}
        >
          회원가입
        </Button>
      </CC.ColumnDiv>
    </Container>
  );
};
export default SignupModal;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  padding: 40px 10px 10px 10px;
  gap: 28px;
  color: ${props => props.theme.colors.white80};
  overflow: scroll;
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
