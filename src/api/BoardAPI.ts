import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
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
  return useQueryHook({
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
    onSuccessHandler: () => {
      props.onSuccessHandler();
    },
  });
};

const getBoard = (props: { id: number }) => {
  return useQueryHook({
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
      router.push('/board');
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
      const _url = `/board/${data.data.json.id}`;
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
