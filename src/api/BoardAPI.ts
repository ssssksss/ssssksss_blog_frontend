import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { RootState } from '@redux/store/reducers';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
    ICreateBoardProps,
    IUpdateBoardProps,
} from '../@types/api/BoardAPI';

/**
 * @param props keyword string [df] ""
 * @param props page number [df] 1
 * @param props size number [df] 10
 * @param props sort string [df] "latest"
 */

const getBoardListData = () => {
  const boardStore = useSelector((state: RootState) => state.boardStore);
  return useQueryHook({
    queryKey: [
      'getBoardList',
      boardStore.keyword,
      boardStore.page + '',
      boardStore.size + '',
      boardStore.sort,
    ],
    requestData: {
      url: '/api/boardList',
      method: 'GET',
      params: {
        keyword: boardStore.keyword,
        page: boardStore.page + '',
        size: boardStore.size + '',
        sort: boardStore.sort,
      },
    },
    isRefetchWindowFocus: false,
  });
};

const getBoard = (props?: {
  onSuccessHandler?: (_res: unknown) => void;
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
    return await AxiosInstance.delete(`/api/board?id=${reqData.id}`, {
      withCredentials: true,
    });
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
    return await AxiosInstance.post(
      '/api/board',
      {
        title: reqData?.title,
        content: reqData?.content,
        writer: reqData?.writer,
      },
      { withCredentials: true },
    );
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      const _url = `/board/${data.data.data?.id}`;
      router.replace(_url);
      // router.beforeHistoryChange()
    },
  });
};

const updateBoard = () => {
  const router = useRouter();
  const mutationFn = async (reqData: IUpdateBoardProps) => {
    return await AxiosInstance.put(
      '/api/board',
      {
        id: reqData.id,
        title: reqData.title,
        content: reqData.content,
      },
      { withCredentials: true },
    ).catch(() => {
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
