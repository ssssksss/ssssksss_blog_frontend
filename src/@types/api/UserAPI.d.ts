interface ISignInUserSuccessDataProps {
  statusCode: number;
  msg: string;
  accessToken: string;
}
interface ISignInUserSuccessVariablesProps {}

export type UserAPIType = {
  ISignInUserSuccessDataProps;
  ISignInUserSuccessVariablesProps;
};
