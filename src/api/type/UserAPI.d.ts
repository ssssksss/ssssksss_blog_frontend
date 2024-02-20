interface ISignInUserSuccessDataProps {
  statusCode: number;
  msg: string;
  accessToken: string;
}
interface ISignInUserSuccessVariablesProps {}

export const UserAPIType = {
  ISignInUserSuccessDataProps,
  ISignInUserSuccessVariablesProps,
};
