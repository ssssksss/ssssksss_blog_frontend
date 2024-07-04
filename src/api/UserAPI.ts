import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import authAction, { SET_USER_INFO } from '@redux/store/auth/actions';
import { RootState } from '@redux/store/reducers';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useSelector } from 'react-redux';

const getUser = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  return useQueryHook({
    queryKey: ['authUserInfo'],
    requestData: {
      url: '/api/user',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
      withCredentials: true,
    },
    isRefetchWindowFocus: false,
    isShowMessage: false,
    onSuccessHandler: ({ data: data }) => {
      store.dispatch(authAction.SET_ACCESS_TOKEN(data.data.user.accessToken));
      store.dispatch(
        rootActions.blogStore.setActiveBlogUserId(data.data.user.id),
      );
      store.dispatch(
        authAction.SET_USER_INFO({
          email: data.data.user.email,
          role: data.data.user.role,
          nickname: data.data.user.nickname,
        }),
      );
    },
  });
};

const signInUser = () => {
  const mutationFn = async (reqData: {email: string, password: string}) => {
    return await AxiosInstance({
      method: 'put',
      url: '/api/user',
      data: {
        email: reqData?.email,
        password: reqData?.password,
      },
      withCredentials: true
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      store.dispatch(
        rootActions.authStore.SET_ACCESS_TOKEN(data.data.accessToken),
      );
      AxiosInstance({
        url: '/api/user',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.data.accessToken}`,
        },
      }).then((response) => {
        store.dispatch(SET_USER_INFO(response.data.data.user));
      });
    },
  });
};

export const UserAPI = {
  getUser,
  signInUser,
};
