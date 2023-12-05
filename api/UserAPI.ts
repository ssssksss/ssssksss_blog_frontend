import AxiosInstance from '@/utils/axios/AxiosInstance';
import { store } from '@/redux/store';
import { ApiProcessHandler } from '@/api/service/ApiProcessHandler';

/**

 */

const getUser = async () => {
  return await ApiProcessHandler({
    url: '/api/user',
    method: 'GET',
    apiCategory: '유저',
  });
};

export const UserAPI = {
  getUser,
};
