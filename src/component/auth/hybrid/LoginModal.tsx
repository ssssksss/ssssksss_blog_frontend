"use client";

import SubmitButton from "@component/common/button/SubmitButton";
import ThemeButton1 from "@component/common/button/ThemeButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetchCSR from "@hooks/useFetchCSR";
import useToastifyStore from "@store/toastifyStore";
import useUserStore from "@store/userStore";
import { UserLoginYup } from "@utils/validation/UserLoginYup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

interface ILoginModal {
  changeAuthScreen: () => void;
  closeModal: () => void;
}

const LoginModal = (props: ILoginModal) => {
  const userStore = useUserStore();
  const fetchCSR = useFetchCSR();
  const toastifyStore = useToastifyStore();
  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(UserLoginYup),
    mode: "onChange",
    defaultValues: {
      password: "P@ssw0rd!",
      email: "test@naver.com",
    },
  });

  const loginHandler = async (data: {email: string; password: string}) => {
    await fetchCSR.requestWithHandler({
      url: "/api/user",
      method: "PUT",
      body: {
        email: data.email,
        password: data.password,
      },
      handleSuccess: async (result: IUser) => {
        if (result.role === "ROLE_ADMIN") {
          try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, data.email, data.password);
            // Firebase 로그인 성공!
          } catch (error) {
            console.error("Firebase 로그인 실패:", error);
            // 실패 처리 (토스트, 에러 메시지 등)
            return;
          }
        }
        userStore.setUser({
          ...result,
        });
        toastifyStore.setToastify({
          message: "로그인 성공",
        });
        props.closeModal();
      },
      handleFail: () => {
        return;
      }
    });
    
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
    <div className="z-10 flex w-full flex-col gap-2 overflow-scroll p-2 text-base scrollbar-hide">
      <header className="flex flex-col items-center gap-2 self-stretch p-2">
        <span className="text-3xl">로그인</span>
      </header>
      <div className={"flex flex-col gap-6 pb-4"}>
        {/* TODO : 에러 메시지 보이는 컴포넌트 작업도 추가하기 */}
        <ThemeInput1
          type={"email"}
          placeholder="이메일"
          register={register("email")}
          className="h-btn-md"
          // onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          // errorMessage={errors.email?.message}
        />
        <ThemeInput1
          type={"password"}
          placeholder="패스워드"
          register={register("password")}
          className="h-btn-md"
          // onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          // errorMessage={errors.password?.message}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <span>아이디가 없으시다면?</span>
          <ThemeButton1
            onClickCapture={() => props.changeAuthScreen()}
            className="flex h-btn-sm items-center rounded-[1rem] p-2 py-1 outline-primary-20 hover:bg-primary-20"
          >
            회원가입
          </ThemeButton1>
        </div>
        <div className="flex items-center justify-center gap-2">
          {/* <Button
            className="relative max-w-fit overflow-hidden rounded-[.5rem] outline-primary-20"
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
            className="relative max-w-fit overflow-hidden rounded-[.5rem] outline-primary-20"
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
            className="relative max-w-fit overflow-hidden rounded-[.5rem] outline-primary-20"
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
        <SubmitButton
          text="로그인"
          className="h-btn-lg w-full p-[.5rem]"
          onClick={async () =>
            await handleSubmit(loginHandler, () => {
              toastifyStore.setToastify({
                type: "error",
                message: "로그인 실패",
              });
            })()
          }
          disabled={!formState.isValid}
          isActive={formState.isValid}
        >
          로그인
        </SubmitButton>
      </div>
    </div>
  );
};

export default LoginModal;
