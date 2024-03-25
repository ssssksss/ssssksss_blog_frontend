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
const LoginModal = (props: { changeAuthScreen: () => void }) => {
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
