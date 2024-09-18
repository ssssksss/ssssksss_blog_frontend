import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

declare interface IFetchHandlerProps {
  accessToken?: RequestCookie | undefined;
  refreshToken?: RequestCookie | undefined;
  url: string;
  method?: string;
  cache?: RequestCache;
  contentType?: string;
  next?: NextFetchRequestConfig | undefined;
  retries?: number;
  bodyData?: object;
  isRefreshNeeded?: boolean;
  credentials?: boolean;
  errorStatusCodeAndHandler?: {
    [code: number]: {
      func: () => void;
    };
  };
}

export type FetchHandlerType = (props: IFetchHandlerProps) => Promise<any>;