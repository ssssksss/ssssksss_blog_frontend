import Button from '@/components/common/button/Button';
import Input from '@/components/common/input/Input';
import Space from '@/components/common/space/Space';
import { CC } from '@/styles/commonComponentStyle';
import theme from '@/styles/theme';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { yupResolver } from '@hookform/resolvers/yup';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { useEffect } from 'react';
import InputBox from '@/components/common/inputBox/inputBox';
import { UserSignupYup } from '@/components/yup/UserSignupYup';

/**
 * Author : Sukyung Lee
 * FileName: ModalSignup.tsx
 * Date: 2022-09-07 12:37:22
 * Description :
 */

interface IUserSignUpProps {
  toggleModal: () => void;
}

const UserSignUp = (props: IUserSignUpProps) => {
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
        gender: params.gender,
        birthDate: params.birthDate,
      },
    })
      .then((response: any) => {
        props.toggleModal();
        alert('회원가입이 되었습니다.');
      })
      .catch((error: any) => {
        // console.log(error.response);
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
      <FormContainer onSubmit={handleSubmit(onClickSubmit, onClickErrorSubmit)}>
        <CC.ColumnDiv gap={10} padding={'20px 20px 20px 20px'}>
          <InputBox
            labelMessage={'닉네임'}
            labelWidth={'100px'}
            errorMessage={errors.nickname?.message}
            height="60px"
          >
            <Input
              placeholder="닉네임을 입력하세요"
              register={register('nickname')}
              onKeyPress={handleSubmit(onClickSubmit, onClickErrorSubmit)}
            />
          </InputBox>
          <InputBox
            labelMessage={'비밀번호'}
            labelWidth={'100px'}
            errorMessage={errors.password?.message}
          >
            <Input
              placeholder="비밀번호를 입력하세요"
              type="password"
              register={register('password')}
              onKeyPress={handleSubmit(onClickSubmit, onClickErrorSubmit)}
            />
          </InputBox>
          <InputBox
            labelMessage={'비번확인'}
            labelWidth={'100px'}
            errorMessage={errors.passwordConfirm?.message}
          >
            <Input
              placeholder="비밀번호를 재입력하세요"
              type="password"
              register={register('passwordConfirm')}
              onKeyPress={handleSubmit(onClickSubmit, onClickErrorSubmit)}
            />
          </InputBox>
          <InputBox
            labelMessage={'이메일'}
            labelWidth={'100px'}
            errorMessage={errors.email?.message}
          >
            <Input
              placeholder="이메일을 입력하세요"
              type="email"
              register={register('email')}
              onKeyPress={handleSubmit(onClickSubmit, onClickErrorSubmit)}
            />
          </InputBox>
          <InputBox labelMessage={'성별'} labelWidth={'100px'}>
            <CC.RowBetweenDiv gap={10} width="100%" padding="2px 20px">
              <CC.RowDiv gap={10} width="50%">
                <Input
                  placeholder="남"
                  type="radio"
                  id="man"
                  name="gender"
                  value="m"
                  register={register('gender')}
                  errorMessage={errors.gender?.message}
                  size="sm"
                  color="red"
                />
                <label htmlFor="man"> 남 </label>
              </CC.RowDiv>
              <CC.RowDiv gap={10} width="50%">
                <Input
                  placeholder="여"
                  type="radio"
                  id="woman"
                  name="gender"
                  value="w"
                  register={register('gender')}
                  errorMessage={errors.gender?.message}
                  size="sm"
                  color="red"
                />
                <label htmlFor="woman"> 여 </label>
              </CC.RowDiv>
            </CC.RowBetweenDiv>
          </InputBox>
          <InputBox
            labelMessage={'생년월일'}
            labelWidth={'100px'}
            errorMessage={errors.birthDate?.message}
          >
            <Input
              placeholder="생년월일을 8자리로 입력하세요"
              register={register('birthDate')}
              onKeyPress={handleSubmit(onClickSubmit, onClickErrorSubmit)}
            />
          </InputBox>
          <CC.RowCenterDiv gap={20}>
            <Button
              width="100%"
              onClick={handleSubmit(onClickSubmit, onClickErrorSubmit)}
              disabled={!formState.isValid}
            >
              가입
            </Button>
            <Button width="100%" onClick={props.toggleModal}>
              취소
            </Button>
          </CC.RowCenterDiv>
        </CC.ColumnDiv>
      </FormContainer>
    </Container>
  );
};
export default UserSignUp;

const UpDownAnimation = keyframes`
        from {
          transform: translate(0, 0);
          border-radius: 0px;
        }
        
        to {
            transform: translate(10px, 10px);
            border-radius: 4px;
        }
`;

const Container = styled.div`
  width: calc(100% - 40px);
  border-radius: 4px;
  z-index: 80;

  input::placeholder {
    font-size: ${theme.fontSizes.sm};
  }

  @media (max-width: 1023px) {
    input::placeholder {
      font-size: ${theme.fontSizes.xs};
    }
  }
`;

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  animation: ${UpDownAnimation} 0.6s ease-in-out;
  animation-fill-mode: forwards;
  color: black;
  background: ${theme.linearGradientColors.skyblue};
  outline: solid ${theme.backgroundColors.grayLight} 2px;
`;
