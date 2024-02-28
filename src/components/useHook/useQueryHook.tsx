import LoadingComponent from '@components/common/loading/LoadingComponent';
import { store } from '@redux/store';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useQuery } from 'react-query';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file useQueryHook.tsx
 * @version 0.0.1 "2024-01-20 14:21:49"
 * @description 설명
 */

interface IAxiosInstanceResponseProps {
  config?: {
    baserequestData: string;
    requestData: string;
    method: string;
  };
  data?: {
    json: any;
    msg: string;
    statusCode: number;
  };
  headers?: any;
  request?: any;
  status?: number;
}

export const UseQueryHook = (
  props: {
    queryKey: string | [];
    requestData: {
      url: string;
      method: string;
      params?: object;
    };
    isShowMessage?: boolean; // toastify message, default false
    isRefetchWindowFocus?: boolean;
    refetchOnMount?: boolean | string;
    onSuccessHandler?: () => () => void;
    enabled: boolean;
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
      onError: (err) => {
        let toasttifyResponse = ['error', false];
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
  if (isLoading)
    return {
      status: status,
      isLoading: isLoading,
      isFetching: isFetching,
      data: (
        <>
          <LoadingComponent />
        </>
      ),
    };
  if (isError) {
    return {
      status: status,
      data: <>{'에러'}</>,
    };
  }
  if (error) {
    return {
      status: status,
      data: <>{'에러'}</>,
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
