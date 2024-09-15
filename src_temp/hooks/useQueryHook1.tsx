import { store } from '@redux/store';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useQuery } from 'react-query';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file useQueryHook1.tsx
 * @version 0.0.1 "2024-01-20 14:21:49"
 * @description 설명
 */

interface IAxiosInstanceResponseProps {
  config?: {
    requestData: string;
    method: string;
  };
  data?: {
    json: Element;
    msg: string;
    statusCode: number;
  };
  headers?: unknown;
  request?: unknown;
  status?: number;
}

export const useQueryHook1 = (
  props: {
    queryKey: string[];
    requestData: {
      url: string;
      method: string;
      params?: object;
      headers?: object;
      withCredentials?: boolean;
    };
    isShowMessage?: boolean; // toastify message, default false
    isRefetchWindowFocus?: boolean;
    refetchOnMount?: boolean | string;
    onSuccessHandler?: () => void;
    enabled?: boolean;
    staleTime?: number;
  }, // focus시 refetch, default true
) => {
  return useQuery(
    [...props.queryKey],
    () => {
      return AxiosInstance({ ...props.requestData }).then(
        (res: IAxiosInstanceResponseProps) => {
          if (props.isShowMessage) {
            store.dispatch(
              SET_TOASTIFY_MESSAGE({
                type: 'success',
                message: res.data.msg,
              }),
            );
          }
          return res.data;
        },
      );
    },
    {
      refetchOnWindowFocus: props.isRefetchWindowFocus,
      refetchOnMount: props.refetchOnMount === false ? false : true,
      retry: '1',
      // notifyOnChangeProps: ['data', 'isFetching'],
      enabled: props.enabled != false,
      staleTime: props.staleTime,
      cacheTime: props.cacheTime,
      onError: (err) => {
        const toasttifyResponse = ['error', false];
        switch (err?.response?.status) {
          case '400' | 400:
            toasttifyResponse[1] = '잘못된 요청';
            break;
          // case '401' | 401:
          //   toasttifyResponse[1] = '인증 에러';
          // break;
          case '403' | 403:
            toasttifyResponse[1] = '권한 에러';
            break;
          case '409' | 409:
            toasttifyResponse[1] = '저장 데이터 중복';
            break;
        }
      },
      select: (data) => {
        let _data = data;
        if (props.onSuccessHandler != undefined && isLoading) {
          props.onSuccessHandler({
            status: status,
            data: data,
            isLoading: isLoading,
          });
        }
        if (props.requestData.select) {
          _data = props.requestData.select(data);
        }
        return _data;
      },
    },
  );

};
