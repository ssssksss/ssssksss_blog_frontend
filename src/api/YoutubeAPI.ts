import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { RootState } from '@redux/store/reducers';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';

const createYoutubeLink = (props: {onSuccessHandler: () => void}) => {
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: { youtubeUrlKeyId : number, youtubeUrl: string}) => {
    return await AxiosInstance.post('/api/youtube/url', {
      youtubeUrlKeyId: reqData.youtubeUrlKeyId,
      youtubeUrl: reqData?.youtubeUrl,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      queryClient.setQueryData(['getYoutubeList'], (oldData: unknown) => {
        oldData.data?.youtubeList.unshift(data.data.data.youtube);
        return oldData;
      });
      props.onSuccessHandler();
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

const deleteYoutubeLink = () => {
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: {id: number}) => {
    return await AxiosInstance.delete(
      `/api/youtube/url?id=${reqData?.id}`,
    )
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      queryClient.setQueryData('getYoutubeList', (oldData: {
        data: {
          youtubeList: unknown[]
        }
      }) => {
        oldData.data.youtubeList = oldData?.data?.youtubeList.filter(
          (i: { id: number }) => i.id != variables.id,
        );
        return oldData;
      });
    },
  });
};

export const YoutubeAPI = {
  createYoutubeLink,
  getYoutubeLinkList,
  deleteYoutubeLink,
};
