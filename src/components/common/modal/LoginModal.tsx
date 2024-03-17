import { UserAPI } from '@api/UserAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import { UserLoginYup } from '@components/yup/UserLoginYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { CC } from '@styles/commonComponentStyle';
import { useForm } from 'react-hook-form';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file LoginModal.tsx
 * @version 0.0.1 "2023-09-24 13:50:42"
 * @description 설명
 */
const LoginModal = (props) => {
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
  const onClickSubmit = async (data: any) => {
    signInMutate({
      email: data.email,
      password: data.password,
    });
  };

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

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
        />
        <Input
          placeholder="비밀번호"
          type="password"
          register={register('password')}
          onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.password?.message}
        />
      </CC.ColumnDiv>
      <CC.ColumnDiv gap={8}>
        <CC.RowCenterDiv gap={8}>
          <span>아이디가 없으시다면?</span>
          <Button
            onClickCapture={() => props.changeAuthScreen()}
            pd={'2px 8px'}
            bg={'white80'}
          >
            회원가입
          </Button>
        </CC.RowCenterDiv>
        <Button
          w={'100%'}
          h={'40px'}
          outline={true}
          onClickCapture={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          pd={'2px 8px'}
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
  padding: ${(props) => props.theme.calcRem(4)};
  gap: ${(props) => props.theme.calcRem(6)};
  color: ${(props) => props.theme.colors.white80};
  overflow: scroll;
  font-size: ${(props) => props.theme.calcRem(16)};
  @media (max-width: 320px) {
    font-size: ${(props) => props.theme.calcRem(8)};
  }
`;

const Header = styled.header`
  ${(props) => props.theme.flex.column};
  gap: ${(props) => props.theme.calcRem(4)};
  align-self: stretch;
  border-radius: ${(props) => props.theme.borderRadius.br10};
  padding: ${(props) => props.theme.calcRem(2)};

  span:nth-of-type(1) {
    /* font-family: ${(props) => props.theme.fontFamily.cookieRunRegular}; */
    font-size: 20px;
  }

  span:nth-of-type(2) {
    color: ${(props) => props.theme.colors.black40};
  }
`;
