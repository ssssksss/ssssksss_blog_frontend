import { useMutationHook } from '@components/useHook/useMutationHook';
import { UseQueryHook } from '@components/useHook/useQueryHook';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import authAction, { SET_USER_INFO } from '@redux/store/auth/actions';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';
import AxiosInstance from '@utils/axios/AxiosInstance';

const getUser = () => {
  return UseQueryHook({
    queryKey: ['authUserInfo'],
    requestData: {
      url: '/api/user',
      method: 'GET',
    },
    isRefetchWindowFocus: false,
    isShowMessage: false,
    onSuccessHandler: ({
      status: status,
      data: data,
      isLoading: isLoading,
    }) => {
      store.dispatch(authAction.SET_ACCESS_TOKEN(data.json.user.accessToken));
      store.dispatch(
        authAction.SET_USER_INFO({
          email: data.json.user.email,
          role: data.json.user.role,
          nickname: data.json.user.nickname,
          id: data.json.user.id,
        })
      );
    },
  });
};

const signInUser = () => {
  const mutationFn = async reqData => {
    return await AxiosInstance.put('/api/user', {
      email: reqData?.email,
      password: reqData?.password,
    }).catch(error => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      let toastifyMessage = '';
      let toastifyType = 'success';
      store.dispatch(
        rootActions.authStore.SET_ACCESS_TOKEN(data.data.accessToken)
      );
      AxiosInstance({
        url: '/api/user',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.data.accessToken}`,
        },
      })
        .then(response => {
          store.dispatch(SET_USER_INFO(response.data.json.user));
          toastifyType = 'success';
          toastifyMessage = '로그인을 완료했습니다.';
        })
        .catch(error => {
          toastifyType = 'error';
          toastifyMessage = '에러';
          console.log('UserLogin.tsx : ', error.response);
        })
        .finally(() => {
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: toastifyType,
              message: toastifyMessage,
            })
          );
        });
    },
    onErrorHandler: ({ error, variables, contex }) => {},
    onSettledHandler: ({ data, error, variables, context }) => {},
  });
};

export const UserAPI = {
  getUser,
  signInUser,
};
