"use client"

import { yupResolver } from '@hookform/resolvers/yup';
import { useFetchHandler } from '@hooks/useFetchHandler';
import { UserAPI } from '@service/userAPI';
import { UserLoginYup } from '@utils/validation/UserLoginYup';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/component/common/button/hybrid/Button';
import Input from 'src/component/common/input/Input';
import AxiosInstance from 'src_temp/utils/axios/AxiosInstance';

interface ILoginModal {
  changeAuthScreen: () => void;
  closeModal: () => void;
}

const LoginModal = (props: ILoginModal) => {
  const { fetchHandler, userStore } = useFetchHandler();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(UserLoginYup),
    mode: 'onChange',
    defaultValues: {
      password: 'P@ssw0rd!',
      email: 'test@naver.com',
    },
  });
  const { errors } = formState;
  const onClickSubmit = async (data: { email: string; password: string }) => {
    fetchHandler(
      await UserAPI.signInUser({
        email: data.email,
        password: data.password,
      }),
      (response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          userStore.setUser({
            ...response.data
          })
          props.closeModal();
        }
      }
    );
  };

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };
const _func = async (event: Event) => {
  const customEvent = event as CustomEvent<{ accessToken: string }>;

  // 로그인 후에 백엔드 과정까지 거치고 난뒤에 실행되는 함수
  userStore.setUser({
    accessToken: customEvent.detail.accessToken,
  });

  AxiosInstance({
    url: '/api/user',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${customEvent.detail.accessToken}`,
    },
  }).then((response) => {
    // TODO 제대로 들어가는지 확인 필요
    userStore.setUser({
      ...response.data.data.user,
    });
  });
};

const oauthLogin = async (oauthService: string) => {
  // ... (oauthLogin 함수 내용은 그대로 유지)
};

useEffect(() => {
  return () => {
    window.document.removeEventListener('oauthLogin', _func as EventListener);
  };
}, []);

  return (
    <div className="flex flex-col p-2 gap-2 overflow-scroll text-base z-10 ">
      <header className="flex flex-col gap-2 self-stretch rounded-lg p-2">
        <span className="text-3xl">로그인</span>
      </header>
      <div className={'flex flex-col gap-6 pb-4'}>
        <Input
          className={
            'pl-2 bg-gray-20 focus:bg-primary-20 focus:outline focus:outline-black-80'
          }
          type={'email'}
          placeholder="이메일"
          register={register('email')}
          onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.email?.message}
        />
        <Input
          className={
            'pl-2 bg-gray-20 focus:bg-primary-20 focus:outline focus:outline-black-80'
          }
          type={'password'}
          placeholder="패스워드"
          register={register('password')}
          onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.password?.message}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center items-center gap-2">
          <span>아이디가 없으시다면?</span>
          <Button
            onClickCapture={() => props.changeAuthScreen()}
            className="py-[.5rem] h-[1.5rem] flex items-center outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 rounded-[1rem] p-2"
          >
            회원가입
          </Button>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button
            className="max-w-fit relative outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 rounded-[.5rem] overflow-hidden"
            onClick={() => {
              oauthLogin('kakao');
            }}
          >
            <Image
              alt={''}
              src={'/images/logo/brand/ic-kakao.svg'}
              width={40}
              height={40}
            />
          </Button>
          <Button
            className="max-w-fit relative outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 rounded-[.5rem] overflow-hidden"
            onClick={() => {
              oauthLogin('google');
            }}
          >
            <Image
              alt={''}
              src={'/images/logo/brand/ic-google.svg'}
              width={40}
              height={40}
            />
          </Button>
          <Button
            className="max-w-fit relative outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 rounded-[.5rem] overflow-hidden"
            onClick={() => {
              oauthLogin('naver');
            }}
          >
            <Image
              alt={''}
              src={'/images/logo/brand/ic-naver.svg'}
              width={40}
              height={40}
            />
          </Button>
        </div>
        <Button
          className="w-full h-[2.4rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 rounded-[1rem] p-[.5rem] hover:bg-primary-20"
          onClickCapture={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          disabled={!formState.isValid}
        >
          로그인
        </Button>
      </div>
    </div>
  );
};

export default LoginModal;