import { yupResolver } from "@hookform/resolvers/yup";
import { UserSignupYup } from "@utils/validation/UserSignupYup";
import Image from "next/image";
import { useEffect } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import Button from "src/component/common/button/hybrid/Button";
import Input from "src/component/common/input/Input";

interface ISignupModal {
  changeAuthScreen: () => void;
  closeModal: () => void;
}

interface ISignupFormData {
  nickname: string;
  password: string;
  passwordConfirm: string;
  email: string;
  gender: string;
  birthDate: string;
}

const SignupModal = (props: ISignupModal) => {

  const {register, handleSubmit, formState, watch, trigger} =
    useForm<ISignupFormData>({
      resolver: yupResolver(UserSignupYup),
      mode: "onChange",
      defaultValues: {
        nickname: "",
        password: "",
        passwordConfirm: "",
        email: "",
        gender: "",
        birthDate: "",
      },
    });
  const {errors} = formState;

  // const onClickSubmit: SubmitHandler<ISignupFormData> = async (data) => {
  //   await AxiosInstance({
  //     url: "/api/user",
  //     method: "POST",
  //     data: {
  //       nickname: data.nickname,
  //       password: data.password,
  //       email: data.email,
  //       gender: "m",
  //       birthDate: "20000101",
  //     },
  //   })
  //     .then(() => {
  //       toastifyStore.setToastify({
  //         type: "success",
  //         message: "회원가입을 완료했습니다.",
  //       });
  //       props.closeModal();
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toastifyStore.setToastify({
  //         type: "error",
  //         message: "회원가입에 실패했습니다.",
  //       });
  //     });
  // };

  const onClickErrorSubmit: SubmitErrorHandler<ISignupFormData> = () => {
    alert("잘못 입력된 값이 존재합니다.");
  };

  const oauthLogin = async (oauthService: string) => {
    // OAuth login logic here
  };

  useEffect(() => {
    if (formState.touchedFields?.password) {
      trigger("password");
      trigger("passwordConfirm");
    }
  }, [watch("password")]);

  return (
    <div className="z-10 flex flex-col gap-2 overflow-scroll p-2 text-base">
      <header className="flex flex-col gap-2 self-stretch p-2">
        <span className="text-3xl">회원가입</span>
      </header>
      <div className="flex flex-col gap-6 pb-4">
        <Input
          className={
            "bg-default-1 pl-2 focus:bg-primary-20 focus:outline focus:outline-black-80"
          }
          type={"email"}
          placeholder="이메일"
          register={register("email")}
          // onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.email?.message}
        />
        <Input
          className={
            "bg-default-1 pl-2 focus:bg-primary-20 focus:outline focus:outline-black-80"
          }
          type={"nickname"}
          placeholder="닉네임"
          register={register("nickname")}
          // onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.nickname?.message}
        />
        <Input
          className={
            "bg-default-1 pl-2 focus:bg-primary-20 focus:outline focus:outline-black-80"
          }
          type={"password"}
          placeholder="비밀번호"
          register={register("password")}
          // onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.password?.message}
        />
        <Input
          className={
            "bg-default-1 pl-2 focus:bg-primary-20 focus:outline focus:outline-black-80"
          }
          type={"passwordConfirm"}
          placeholder="비밀번호 확인"
          register={register("passwordConfirm")}
          // onKeyPressAction={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          errorMessage={errors.passwordConfirm?.message}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <span>아이디가 있다면?</span>
          <Button
            onClickCapture={props.changeAuthScreen}
            className="flex h-[1.5rem] items-center rounded-[1rem] p-2 py-[.5rem] outline-primary-20 hover:bg-primary-20"
          >
            로그인
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            className="default-flex relative overflow-hidden rounded-[.5rem] outline-primary-20 hover:bg-primary-20"
            w={"2.5rem"}
            h={"2.5rem"}
            onClick={() => oauthLogin("kakao")}
          >
            <Image
              alt={""}
              src={"/images/logo/brand/ic-kakao.svg"}
              width={36}
              height={36}
            />
          </Button>
          <Button
            className="default-flex relative overflow-hidden rounded-[.5rem] outline-primary-20 hover:bg-primary-20"
            w={"2.5rem"}
            h={"2.5rem"}
            onClick={() => oauthLogin("google")}
          >
            <Image
              alt={""}
              src={"/images/logo/brand/ic-google.svg"}
              width={36}
              height={36}
            />
          </Button>
          <Button
            className="default-flex relative overflow-hidden rounded-[.5rem] outline-primary-20 hover:bg-primary-20"
            w={"2.5rem"}
            h={"2.5rem"}
            onClick={() => oauthLogin("naver")}
          >
            <Image
              alt={""}
              src={"/images/logo/brand/ic-naver.svg"}
              width={36}
              height={36}
            />
          </Button>
        </div>
        <Button
          className="h-[2.4rem] w-full rounded-[1rem] p-[.5rem] outline-primary-20 hover:bg-primary-20"
          // onClickCapture={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          disabled={!formState.isValid}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default SignupModal;
