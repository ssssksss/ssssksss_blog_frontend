import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import Space from "@/components/common/space/Space";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useForm } from "react-hook-form";
import styled, { keyframes } from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { UserLoginYup } from "./UserLoginYup";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setUserInfo } from "@/redux/store/auth/actions";
import { RootState } from "@/redux/store/reducers";
import { store } from "@/redux/store";

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
    mode: "onChange",
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const { errors } = formState;

  const onClickSubmit = async (data: any) => {
    const { passwordConfirm, ...params } = data;

    await AxiosInstance({
      url: "/api/user",
      method: "PUT",
      data: {
        email: params.email,
        password: params.password,
      },
    })
      .then((response: any) => {
        props.toggleModal();
        dispatch(setAccessToken(response.data.accessToken));
        AxiosInstance({
          url: "/api/user",
          method: "GET",
          headers: {
            Authorization: `Bearer ${store.getState().authStore.accessToken}`,
          },
        })
          .then((response) => {
            store.dispatch(setUserInfo(response.data.data.user));
          })
          .catch((error) => {});
      })
      .catch((error: any) => {
        alert(error.response.data.errorMsg);
      });
  };

  const onClickErrorSubmit = () => {
    alert("잘못 입력된 값이 존재합니다.");
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onClickSubmit, onClickErrorSubmit)}>
        <CF.RowCenterDiv
          height="30px"
          color="#fff"
          fontSize={theme.fontSizes.lg}
          padding={"10px 0px 0px 0px"}
        >
          로그인
        </CF.RowCenterDiv>
        <CF.ColumnDiv gap={10} padding={"20px 20px 20px 20px"} color={"#fff"}>
          <Space title4="이메일" titleWidth={"140px"}>
            <Input
              placeholder="이메일을 입력하세요"
              type="email"
              register={register("email")}
            />
            <CF.ErrorDiv> {errors.email?.message} </CF.ErrorDiv>
          </Space>
          <Space title4="비밀번호" titleWidth={"140px"}>
            <Input
              placeholder="비밀번호를 입력하세요"
              type="password"
              register={register("password")}
            />
            <CF.ErrorDiv> {errors.password?.message} </CF.ErrorDiv>
          </Space>
          <CF.RowDiv gap={20}>
            <Button
              onClick={handleSubmit(onClickSubmit, onClickErrorSubmit)}
              disabled={!formState.isValid}
            >
              로그인
            </Button>
            <Button onClick={props.toggleModal}> 취소 </Button>
          </CF.RowDiv>
        </CF.ColumnDiv>
      </FormContainer>
    </Container>
  );
};
export default UserLogin;

const UpDownAnimation = keyframes`
        from {
          opacity: 0;
          transform: translate(0, 0);
          border-radius: 0px 0px 0px 0px;
        }
        
        to {
            opacity: 1;
            transform: translate(10px, 10px);
          border-radius: 50px 0px 4px 4px;
        }
`;

const Container = styled.div`
  width: calc(100% - 80px);
  border-radius: 50px 4px 4px 4px;
  background-color: ${theme.backgroundColors.primary};
  z-index: 80;
  margin-top: 20px;

  input::placeholder {
    font-size: ${theme.fontSizes.base};
  }

  @media (max-width: 1023px) {
    input::placeholder {
      font-size: ${theme.fontSizes.small};
    }
  }
`;

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.backgroundColors.secondary};
  animation: ${UpDownAnimation} 1s ease-in-out;
  animation-fill-mode: forwards;
`;
