import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  ICreateBoardProps,
  IGetBoardListDataProps,
  IUpdateBoardProps,
} from './type/BoardAPI.d';

/**
 * @param props keyword string [df] ""
 * @param props page number [df] 1
 * @param props size number [df] 10
 * @param props sort string [df] "latest"
 */

const getBoardListData = (props: IGetBoardListDataProps) => {
  const router = useRouter();
  const boardStore = useSelector((state) => state.boardStore);
  return useQueryHook({
    queryKey: [
      'getBoardList',
      boardStore.keyword as string,
      boardStore.page as string,
      boardStore.size as string,
      boardStore.sort as string,
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
    onSuccessHandler: () => {
      store.dispatch(
        rootActions.boardStore.SET_BOARD_LIST_OPTION({
          keyword: String(boardStore.keyword ?? (router.query.keyword || '')),
          page: Number(boardStore.page ?? (Number(router.query.page) - 1 || 0)),
          size: Number(boardStore.size ?? (router.query.size || 10)),
          sort: String(boardStore.sort ?? (router.query.sort || 'latest')),
        }),
      );
    },
  });
};

const getBoard = (props?: {
  onSuccessHandler?: (res) => void;
  enabled?: boolean;
}) => {
  const router = useRouter();
  return useQueryHook({
    queryKey: ['getBoard'],
    requestData: {
      url: '/api/board',
      method: 'GET',
      params: {
        id: Number(router.query.id),
      },
    },
    isRefetchWindowFocus: false,
    isShowMessage: false,
    onSuccessHandler: (res) => {
      props.onSuccessHandler(res);
    },
    enabled: props?.enabled,
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
      router.push('/board');
    },
  });
};

const createBoard = () => {
  const router = useRouter();
  const mutationFn = async (reqData: ICreateBoardProps) => {
    return await AxiosInstance.post('/api/board', {
      title: reqData?.title,
      content: reqData?.content,
      writer: reqData?.writer,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      const _url = `/board/${data.data.json.id}`;
      router.replace(_url);
      // router.beforeHistoryChange()
    },
  });
};

const updateBoard = () => {
  const router = useRouter();
  const mutationFn = async (reqData: IUpdateBoardProps) => {
    return await AxiosInstance.put('/api/board', {
      id: reqData.id,
      title: reqData.title,
      content: reqData.content,
    }).catch(() => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      const _url = `/board/${variables.id}`;
      router.replace(_url);
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
