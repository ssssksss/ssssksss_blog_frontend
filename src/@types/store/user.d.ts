declare interface IResponseUser {
  status: number;
  msg: string;
  data: IUser;
}

declare interface IUser {
  email: string;
  id: number;
  nickname: string;
  role: string;
  suid: string;
}
