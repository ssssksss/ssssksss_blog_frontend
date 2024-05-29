import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { ICreateMemoCategoryProps, IMemoCommonProps } from 'src/@types/api/memo/MemoAPI';
import { ApiProcessHandler } from './service/ApiProcessHandler';

const createMemoCategory = (props?: IMemoCommonProps) => {
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: ICreateMemoCategoryProps) => {
    return await AxiosInstance.post(
      '/api/memo/category',
      {
        name: reqData.name,
        backgroundColor: reqData.backgroundColor,
      },
      {
        withCredentials: true,
      },
    ).catch(() => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      store.dispatch(
        rootActions.memoStore.SET_MEMO_CATEGORY_LIST(
          data.data.data?.memoCategory,
        ),
      );
      queryClient.setQueryData(['memoCategory'], ((oldData: []) => {
        return [...oldData, data.data.data?.memoCategory];
      }))
      props.onSuccessHandler();
    },
    // onErrorHandler: ({ error, variables, context }) => {},
    // onSettledHandler: ({ data, error, variables, context }) => {},
  });
};

const getMemoCategoryList = () => {
  // return ApiProcessHandler({
  //   url: '/api/memo/category',
  //   method: 'GET',
  //   apiCategory: '할일 카테고리',
  // });

  // // =========================
    return useQueryHook({
      queryKey: ['memoCategory'],
      requestData: {
        url: '/api/memo/category',
        method: 'GET',
      },
      isRefetchWindowFocus: false,
    });
};

const updateMemoCategory = (props) => {
  // TODO API 수정 필요
  return ApiProcessHandler({
    url: '/api/memo/category',
    method: 'PUT',
    apiCategory: '할일 카테고리',
    data: {
      id: props.id,
      name: props.name,
      backgroundColor: props.backgroundColor,
    },
    isShowMessage: true,
  });

};

const deleteMemoCategory = (props) => {
  // TODO API 수정 필요
  return ApiProcessHandler({
    url: '/api/memo/category',
    method: 'DELETE',
    apiCategory: '할일 카테고리',
    params: {
      id: props.id,
    },
    isShowMessage: true,
  });
};

const addMemo = (props) => {
  // TODO API 수정 필요
  return ApiProcessHandler({
    url: '/api/memo',
    method: 'POST',
    data: {
      content: props.content,
      memoCategoryId: props.memoCategoryId,
    },
    apiCategory: '메모',
    isShowMessage: true,
  });
};

const getMemoList = (props: {type: string}) => {
  const authStore = useSelector((state: RootState) => state.authStore);
  return useQueryHook({
    queryKey: ['authUserInfo', authStore.id],
    requestData: {
      url: '/api/memo',
      method: 'GET',
      params: {
        type: props.type,
      },
    },
    isRefetchWindowFocus: false,
    onSuccessHandler: () => {},
  });
};

const updateMemo = (props) => {
  // TODO API 수정 필요
  return ApiProcessHandler({
    url: '/api/memo',
    method: 'PUT',
    apiCategory: '메모',
    data: {
      id: props.id,
      content: props.content,
    },
    isShowMessage: true,
  });
};

const deleteMemo = (props) => {
  // TODO API 수정 필요
  return ApiProcessHandler({
    url: '/api/memo',
    method: 'DELETE',
    apiCategory: '메모',
    params: {
      id: props.id,
    },
  }).then(() => {
    store.dispatch(
      rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
        type: 'success',
        message: '메모 삭제 성공',
      }),
    );
  });
};

export const MemoAPI = {
  createMemoCategory,
  getMemoCategoryList,
  updateMemoCategory,
  deleteMemoCategory,
  addMemo,
  getMemoList,
  updateMemo,
  deleteMemo,
};
