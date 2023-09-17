import Button from '@/components/common/button/Button';
import Input from '@/components/common/input/Input';
import Space from '@/components/common/space/Space';
import { CC } from '@/styles/commonComponentStyle';
import theme from '@/styles/theme';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setUserInfo } from '@/redux/store/auth/actions';
import { RootState } from '@/redux/store/reducers';
import { store } from '@/redux/store';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import InputBox from '@/components/common/inputBox/inputBox';
import { UserLoginYup } from '@/components/yup/UserLoginYup';

/**
 * Author : Sukyung Lee
 * FileName: UserLogin.tsx
 * Date: 2022-09-09 00:49:25
 * Description :
 */

interface IUserLoginProps {
  toggleModal: () => void;
}

const UserLogin = (props: IUserLoginProps) => {
  const dispatch = useDispatch();
  // store에서 상태값 가져오기
  const authStore = useSelector((state: RootState) => state.authStore);

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

    await AxiosInstance({
      url: '/api/user',
      method: 'PUT',
      data: {
        email: params.email,
        password: params.password,
      },
    })
      .then((response: any) => {
        dispatch(setAccessToken(response.data.accessToken));
        AxiosInstance({
          url: '/api/user',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`,
          },
        })
          .then(response => {
            store.dispatch(setUserInfo(response.data.data.user));
            props.toggleModal();
          })
          .catch(error => {
            console.log('UserLogin.tsx : ', error.response);
          });
      })
      .catch((error: any) => {
        console.log('UserLogin.tsx : ', error.response);
        alert(error.response?.data?.errorMsg);
      });
  };

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onClickSubmit, onClickErrorSubmit)}>
        <CC.ColumnDiv gap={16} padding={'20px 20px 20px 20px'} width={'100%'}>
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
              defaultValue={'temp@test.com'}
            />
          </InputBox>
          <InputBox
            labelMessage={'비밀번호'}
            labelWidth={'100px'}
            errorMessage={errors.password?.message}
            defaultValue={'P@ssw0rd!'}
          >
            <Input
              placeholder="비밀번호를 입력하세요"
              type="password"
              register={register('password')}
              onKeyPress={handleSubmit(onClickSubmit, onClickErrorSubmit)}
            />
          </InputBox>
          <CC.RowCenterDiv gap={20} width={'100%'}>
            <Button
              onClick={handleSubmit(onClickSubmit, onClickErrorSubmit)}
              disabled={!formState.isValid}
              width="100%"
            >
              로그인
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
export default UserLogin;

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
