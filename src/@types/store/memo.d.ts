declare interface IMemo {
  id: number;
  content: string;
}

declare interface IReqCreateMemo {
  data: IMemo;
  msg: string;
  statusCode: number;
}
declare interface IReqReadMemoList {
  data: IMemo[];
  msg: string;
  statusCode: number;
}
