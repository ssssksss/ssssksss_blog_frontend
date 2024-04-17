import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { RootState } from '@redux/store/reducers';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useSelector } from 'react-redux';

const createYoutubeLink = (props) => {
  const mutationFn = async (reqData) => {
    return await AxiosInstance.post('/api/youtube/url', {
      youtubeUrlKeyId: reqData.youtubeUrlKeyId,
      youtubeUrl: reqData?.youtubeUrl,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      props.onSuccessHandler({ data, variables, context });
    },
  });
};

const getYoutubeLinkList = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  return useQueryHook({
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

const deleteYoutubeLink = (props) => {
  const mutationFn = async (reqData) => {
    return await AxiosInstance.delete(
      `/api/youtube/url?id=${reqData?.id}`,
      {},
    ).catch(() => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      props.onSuccessHandler({ data, variables, context });
    },
  });
};

export const YoutubeAPI = {
  createYoutubeLink,
  getYoutubeLinkList,
  deleteYoutubeLink,
};
