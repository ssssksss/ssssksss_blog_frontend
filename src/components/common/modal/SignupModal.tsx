import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import { UserSignupYup } from '@components/yup/UserSignupYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { CC } from '@styles/commonComponentStyle';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file SignupModal.tsx
 * @version 0.0.1 "2023-09-24 14:22:40"
 * @description 설명
 */

const SignupModal = (props: {
  closeModal: () => void;
  changeAuthScreen: () => void;
}) => {
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

  const onClickSubmit = async (data: unknown) => {
    const { ...params } = data;
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
      .then(() => {
        store.dispatch(
          rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
            type: 'success',
            message: '회원가입을 완료했습니다.',
          }),
        );
        props.closeModal();
      })
      .catch((error: unknown) => {
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
        <span>회원가입</span>
        <span>
          비밀번호는 암호화처리되며 개인정보는 다른 곳에 사용되지 않습니다.
        </span>
      </Header>
      <CC.ColumnDiv gap={28}>
        <Input
          placeholder="이메일"
          register={register('email')}
          errorMessage={errors.email?.message}
        />
        <Input
          placeholder="닉네임"
          register={register('nickname')}
          errorMessage={errors.nickname?.message}
        />
        <Input
          placeholder="비밀번호"
          register={register('password')}
          errorMessage={errors.password?.message}
          type="password"
        />
        <Input
          placeholder="비밀번호확인"
          register={register('passwordConfirm')}
          errorMessage={errors.passwordConfirm?.message}
          type="password"
        />
      </CC.ColumnDiv>
      <CC.ColumnDiv gap={8}>
        {/* <CC.RowCenterDiv gap={20}>
          <Image src={Icons.GoogleIcon} alt="google" />
          <Image src={Icons.KakaoIcon} alt="kakao" />
        </CC.RowCenterDiv> */}
        <CC.RowCenterDiv gap={8}>
          <span>아이디가 있다면?</span>
          <Button
            onClickCapture={(e) => {
              e.stopPropagation();
              props.changeAuthScreen();
            }}
            pd={'0rem 0.8rem'}
            bg={'white80'}
            h={'2rem'}
          >
            로그인
          </Button>
        </CC.RowCenterDiv>
        <Button
          w={'100%'}
          h={'2.4rem'}
          outline={true}
          onClickCapture={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          disabled={!formState.isValid}
        >
          회원가입
        </Button>
      </CC.ColumnDiv>
    </Container>
  );
};
export default SignupModal;

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
    font-size: 2rem;
  }

  span:nth-of-type(2) {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.black40};
  }
`;
