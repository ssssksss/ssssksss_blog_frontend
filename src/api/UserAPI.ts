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
      store.dispatch(authAction.SET_ACCESS_TOKEN(data.json.user.accessToken));
      store.dispatch(
        rootActions.blogStore.setActiveBlogUserId(data.json.user.id),
      );
      store.dispatch(
        authAction.SET_USER_INFO({
          email: data.json.user.email,
          role: data.json.user.role,
          nickname: data.json.user.nickname,
          id: data.json.user.id,
        }),
      );
    },
  });
};

const signInUser = () => {
  const mutationFn = async (reqData) => {
    return await AxiosInstance.put('/api/user', {
      email: reqData?.email,
      password: reqData?.password,
    },{
      withCredentials: true,
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
        store.dispatch(SET_USER_INFO(response.data.json.user));
      });
    },
  });
};

export const UserAPI = {
  getUser,
  signInUser,
};
