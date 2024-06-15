import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { RootState } from '@redux/store/reducers';
import AxiosInstanceAuth from '@utils/axios/AxiosInstanceAuth';
import { useSelector } from 'react-redux';

const createYoutubeLink = (props) => {
  const mutationFn = async (reqData) => {
    return await AxiosInstanceAuth.post('/api/youtube/url', {
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
      withCredentials: true
    },
    isRefetchWindowFocus: false,
    onSuccessHandler: () => {},
    enabled: authStore.id != undefined,
  });
};

const deleteYoutubeLink = (props: {onSuccessHandler: () => void}) => {
  const mutationFn = async (reqData: {id: number}) => {
    return await AxiosInstanceAuth.delete(
      `/api/youtube/url?id=${reqData?.id}`,
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
