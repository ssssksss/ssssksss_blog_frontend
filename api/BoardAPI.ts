import { BoardAPIType } from './type/BoardAPI';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { store } from '@/redux/store';
import { ApiProcessHandler } from '@/api/service/ApiProcessHandler';
import { UseQueryHook } from '@/components/useHook/useQueryHook';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutationHook } from '@/components/useHook/useMutationHook';
import { route } from 'next/dist/server/router';
import { rootActions } from './../redux/store/actions';

/**
 * @param props keyword string [df] ""
 * @param props page number [df] 1
 * @param props size number [df] 10
 * @param props sort string [df] "latest"
 */

const getBoardListData = (props: BoardAPIType.IGetBoardListDataProps) => {
  const boardStore = useSelector(state => state.boardStore);
  return UseQueryHook({
    queryKey: [
      ['getBoardList'],
      [boardStore.keyword, boardStore.page, boardStore.size, boardStore.sort],
    ],
    requestData: {
      url: '/api/boardList',
      method: 'GET',
      params: {
        keyword: props.keyword,
        page: props.page,
        size: props.size,
        sort: props.sort,
      },
    },
    isRefetchWindowFocus: false,
    enabled: props.enabled,
    onSuccessHandler: res => {
      props.onSuccessHandler();
    },
  });
};

const getBoard = (props: { id: number }) => {
  return UseQueryHook({
    queryKey: ['getBoard'],
    requestData: {
      url: '/api/board',
      method: 'GET',
      params: {
        id: props.id,
      },
    },
    isRefetchWindowFocus: false,
    isShowMessage: false,
    onSuccessHandler: res => {
      props.onSuccessHandler(res);
    },
    enabled: props.enabled,
  });
};

const deleteBoard = () => {
  const router = useRouter();
  const mutationFn = async reqData => {
    return await AxiosInstance.delete(`/api/board?id=${reqData.id}`);
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      router.back();
    },
    onErrorHandler: ({ error, variables, context }) => {},
    onSettledHandler: ({ data, error, variables, context }) => {},
  });
};

const createBoard = () => {
  const router = useRouter();
  const mutationFn = async reqData => {
    return await AxiosInstance.post('/api/board', {
      title: reqData?.title,
      content: reqData?.content,
      writer: reqData?.writer,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      let _url = `/board/${data.data.json.id}`;
      router.replace(_url);
      // router.beforeHistoryChange()
    },
    onErrorHandler: ({ error, variables, context }) => {},
    onSettledHandler: ({ data, error, variables, context }) => {},
  });
};

const updateBoard = () => {
  const router = useRouter();
  const mutationFn = async reqData => {
    return await AxiosInstance.put('/api/board', {
      id: reqData.id,
      title: reqData.title,
      content: reqData.content,
    }).catch(error => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      console.log('BoardAPI.ts 파일 : ', variables);
      let _url = `/board/${variables.id}`;
      router.replace(_url);
      store.dispatch(
        rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
          type: 'success',
          message: data.data.msg,
        })
      );
    },
    onErrorHandler: ({ error, variables, context }) => {
      console.log('BoardAPI.ts 파일 : ', error);
    },
    onSettledHandler: ({ data, error, variables, context }) => {},
  });
};

export const BoardAPI = {
  getBoardListData,
  getBoard,
  updateBoard,
  deleteBoard,
  createBoard,
};
