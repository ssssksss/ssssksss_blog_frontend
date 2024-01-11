import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import { BoardAPIType } from './type/BoardAPI';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { store } from '@/redux/store';
import { ApiProcessHandler } from '@/api/service/ApiProcessHandler';

/**
 * @param props keyword string [df] ""
 * @param props page number [df] 1
 * @param props size number [df] 10
 * @param props sort string [df] "latest"
 */

const getBoardListData = async (props: BoardAPIType.IGetBoardListDataProps) => {
  return await ApiProcessHandler({
    url: '/api1/boardList',
    method: 'GET',
    params: {
      keyword: String(props.keyword || ''),
      page: Number(props.page || 0),
      size: Number(props.size || 10),
      sort: String(props.sort || ''),
    },
    apiCategory: '게시판',
  });
};

const getBoard = async (props: { id: number }) => {
  return await ApiProcessHandler({
    url: '/api1/board',
    method: 'GET',
    params: {
      id: props.id,
    },
    apiCategory: '게시판',
  });
};

const deleteBoard = async (props: { id: number }) => {
  return await ApiProcessHandler({
    url: '/api/board',
    method: 'DELETE',
    data: {
      id: props.id,
    },
    apiCategory: '게시판',
  });
};

export const BoardAPI = {
  getBoardListData,
  getBoard,
  deleteBoard,
};
