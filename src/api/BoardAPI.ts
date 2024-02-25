import { useMutationHook } from '@components/useHook/useMutationHook';
import { UseQueryHook } from '@components/useHook/useQueryHook';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { IGetBoardListDataProps } from './type/BoardAPI.d';

/**
 * @param props keyword string [df] ""
 * @param props page number [df] 1
 * @param props size number [df] 10
 * @param props sort string [df] "latest"
 */

const getBoardListData = (props: IGetBoardListDataProps) => {
  const boardStore = useSelector((state) => state.boardStore);
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
    onSuccessHandler: (_) => {
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
    onSuccessHandler: (res) => {
      props.onSuccessHandler(res);
    },
    enabled: props.enabled,
  });
};

const deleteBoard = () => {
  const router = useRouter();
  const mutationFn = async (reqData) => {
    return await AxiosInstance.delete(`/api/board?id=${reqData.id}`);
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: () => {
      router.back();
    },
  });
};

const createBoard = () => {
  const router = useRouter();
  const mutationFn = async (reqData) => {
    return await AxiosInstance.post('/api/board', {
      title: reqData?.title,
      content: reqData?.content,
      writer: reqData?.writer,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      let _url = `/board/${data.data.json.id}`;
      router.replace(_url);
      // router.beforeHistoryChange()
    },
  });
};

const updateBoard = () => {
  const router = useRouter();
  const mutationFn = async (reqData) => {
    return await AxiosInstance.put('/api/board', {
      id: reqData.id,
      title: reqData.title,
      content: reqData.content,
    }).catch((_) => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables }) => {
      let _url = `/board/${variables.id}`;
      router.replace(_url);
      store.dispatch(
        rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
          type: 'success',
          message: data.data.msg,
        }),
      );
    },
    onErrorHandler: ({ error }) => {
      console.log('BoardAPI.ts 파일 : ', error);
    },
  });
};

export const BoardAPI = {
  getBoardListData,
  getBoard,
  updateBoard,
  deleteBoard,
  createBoard,
};
