import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useQuery } from 'react-query';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file useQueryHook.tsx
 * @version 0.0.1 "2024-01-20 14:21:49"
 * @description 설명
 */

export const useQueryHook = (
  props: {
    queryKey: string[];
    requestData: {
      url?: string;
      method?: string;
      params?: object;
      headers?: object;
      withCredentials?: boolean;
    };
    isShowMessage?: boolean; // toastify message, default false
    isRefetchWindowFocus?: boolean;
    refetchOnMount?: boolean | string;
    onSuccessHandler?: ({status, data, isLoading}:{
      status: string,
      data: unknown,
      isLoading: boolean,
    }) => void;
    enabled?: boolean | boolean[];
    staleTime?: number;
    cacheTime?: number;
  }, // focus시 refetch, default true
) => {
  const {
    isLoading,
    data,
    isError,
    error,
    status,
    isFetching,
    dataUpdatedAt,
    refetch,
  } = useQuery(
    [...props.queryKey],
    () => {
      return AxiosInstance({
        url: props.requestData.url,
        method: 'GET',
        params: props.requestData.params,
      }).then((res) => {
        if (props.isShowMessage) {
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: 'success',
              message: res.data.msg,
            }),
          );
        }
        return res.data;
      });
    },
    {
      refetchOnWindowFocus: props.isRefetchWindowFocus,
      refetchOnMount: props.refetchOnMount === false ? false : true,
      retry: 1,
      // notifyOnChangeProps: ['data', 'isFetching'],
      enabled: props.enabled != false,
      staleTime: props.staleTime || 1000 * 60 * 5,
      cacheTime: props.cacheTime || 1000 * 60 * 10,
      onError: (err: {
        response: {
        status: number
      }}) => {
        const toasttifyResponse = ['error', "error..."];
        switch (err?.response?.status) {
          case 400:
            toasttifyResponse[1] = '잘못된 요청';
            break;
          case 401:
            toasttifyResponse[1] = '인증 에러';
          break;
          case 403:
            toasttifyResponse[1] = '권한 에러';
            break;
          case 409:
            toasttifyResponse[1] = '저장 데이터 중복';
            break;
        }
        if(err?.response?.status > 400) {
          store.dispatch(rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
            type: "error",
            message: toasttifyResponse[1],
          }))
        }
      },
      select: (data) => {
        const _data = data;
        if (props.onSuccessHandler != undefined && isLoading) {
          props.onSuccessHandler({
            status: status,
            data: data,
            isLoading: isLoading,
          });
        }
        // if (props.requestData.select) {
        //   _data = props.requestData.select(data);
        // }
        return _data;
      },
    },
  );
  if (isLoading)
    return {
      status,
      isLoading: isLoading,
      isFetching: isFetching,
    };
  if (isError) {
    return {
      status: status,
    };
  }
  if (error) {
    return {
      status: status,
    };
  }
  if (data) {
    return {
      status,
      data,
      isLoading,
      isFetching,
      dataUpdatedAt,
      refetch,
    };
  }
};
