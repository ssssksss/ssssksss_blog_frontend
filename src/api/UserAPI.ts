import { useMutationHook } from '@hooks/useMutationHook';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { SET_USER_INFO } from '@redux/store/auth/actions';
import AxiosInstance from '@utils/axios/AxiosInstance';

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
  signInUser,
};
