import { useMutationHook } from '@components/useHook/useMutationHook';
import { UseQueryHook } from '@components/useHook/useQueryHook';
import { store } from '@redux/store';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useSelector } from 'react-redux';

const createYoutubeLink = props => {
  const mutationFn = async reqData => {
    return await AxiosInstance.post('/api/youtube/url', {
      title: reqData?.title,
      imageUrl: reqData?.imageUrl,
      tags: reqData?.tags,
      youtubeUrl: reqData?.youtubeUrl,
    }).catch(error => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      store.dispatch(
        SET_TOASTIFY_MESSAGE({
          type: 'success',
          message: `추가되었습니다.`,
        })
      );
      props.onSuccessHandler({ data, variables, context });
    },
    onErrorHandler: ({ error, variables, context }) => {},
    onSettledHandler: ({ data, error, variables, context }) => {},
  });
};

const getYoutubeLinkList = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  return UseQueryHook({
    queryKey: ['getYoutubeList'],
    requestData: {
      url: '/api/youtube/url',
      method: 'GET',
    },
    isRefetchWindowFocus: false,
    onSuccessHandler: () => {},
    enabled: authStore.id != undefined,
  });
};

const deleteYoutubeLink = props => {
  const mutationFn = async reqData => {
    return await AxiosInstance.delete(
      `/api/youtube/url?id=${reqData?.id}`,
      {}
    ).catch(error => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      props.onSuccessHandler({ data, variables, context });
      store.dispatch(
        SET_TOASTIFY_MESSAGE({
          type: 'success',
          message: `추가되었습니다.`,
        })
      );
    },
    onErrorHandler: ({ error, variables, context }) => {},
    onSettledHandler: ({ data, error, variables, context }) => {},
  });

  return;
};

export const YoutubeAPI = {
  createYoutubeLink,
  getYoutubeLinkList,
  deleteYoutubeLink,
};
