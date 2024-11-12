"use client";

import {yupResolver} from "@hookform/resolvers/yup";
import {useFetchCSRHandler} from "@hooks/useFetchCSRHandler";
import {UserAPI} from "@service/userAPI";
import {UserLoginYup} from "@utils/validation/UserLoginYup";
import {useForm} from "react-hook-form";
import Button from "src/component/common/button/hybrid/Button";
import Input from "src/component/common/input/Input";

interface ILoginModal {
  changeAuthScreen: () => void;
  closeModal: () => void;
}

const LoginModal = (props: ILoginModal) => {
  const {fetchCSR, userStore} = useFetchCSRHandler();

  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(UserLoginYup),
    mode: "onChange",
    defaultValues: {
      password: "P@ssw0rd!",
      email: "test@naver.com",
    },
  });
  const {errors} = formState;
  const onClickSubmit = async (data: {email: string; password: string}) => {
    fetchCSR(
      await UserAPI.signInUser({
        email: data.email,
        password: data.password,
      }),
      (response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          userStore.setUser({
            ...response.data,
          });
          props.closeModal();
        }
      },
    );
  };

  const onClickErrorSubmit = () => {
    alert("잘못 입력된 값이 존재합니다.");
  };
  // const _func = async (event: Event) => {
  //   const customEvent = event as CustomEvent<{accessToken: string}>;
  //   AxiosInstance({
  //     url: "/api/user",
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${customEvent.detail.accessToken}`,
  //     },
  //   }).then((response) => {
  //     // TODO 제대로 들어가는지 확인 필요
  //     userStore.setUser({
  //       ...response.data.data.user,
  //     });
  //     props.closeModal();
  //   });
  // };

  // const oauthLogin = async (oauthService: string) => {
  // };

  // useEffect(() => {
  //   return () => {
  //     window.document.removeEventListener("oauthLogin", _func as EventListener);
  //   };
  // }, []);

  return (
    <div className="z-10 flex flex-col gap-2 overflow-scroll p-2 text-base">
      <header className="flex flex-col gap-2 self-stretch rounded-lg p-2">
        <span className="text-3xl">로그인</span>
      </header>
      <div className={"flex flex-col gap-6 pb-4"}>
        <Input
          className={
            "bg-gray-20 pl-2 focus:bg-primary-20 focus:outline focus:outline-black-80"
          }
          type={"email"}
          placeholder="이메일"
          register={register("email")}
          onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.email?.message}
        />
        <Input
          className={
            "bg-gray-20 pl-2 focus:bg-primary-20 focus:outline focus:outline-black-80"
          }
          type={"password"}
          placeholder="패스워드"
          register={register("password")}
          onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.password?.message}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <span>아이디가 없으시다면?</span>
          <Button
            onClickCapture={() => props.changeAuthScreen()}
            className="flex h-[1.5rem] items-center rounded-[1rem] p-2 py-[.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20"
          >
            회원가입
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          {/* <Button
            className="relative max-w-fit overflow-hidden rounded-[.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20"
            onClick={() => {
              oauthLogin("kakao");
            }}>
            <Image
              alt={""}
              src={"/images/logo/brand/ic-kakao.svg"}
              width={40}
              height={40}
            />
          </Button> */}
          {/* <Button
            className="relative max-w-fit overflow-hidden rounded-[.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20"
            onClick={() => {
              oauthLogin("google");
            }}>
            <Image
              alt={""}
              src={"/images/logo/brand/ic-google.svg"}
              width={40}
              height={40}
            />
          </Button> */}
          {/* <Button
            className="relative max-w-fit overflow-hidden rounded-[.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20"
            onClick={() => {
              oauthLogin("naver");
            }}>
            <Image
              alt={""}
              src={"/images/logo/brand/ic-naver.svg"}
              width={40}
              height={40}
            />
          </Button> */}
        </div>
        <Button
          className="h-[2.4rem] w-full rounded-[1rem] p-[.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 hover:bg-primary-20"
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
