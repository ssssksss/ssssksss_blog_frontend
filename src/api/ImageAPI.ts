import { useMutationHook } from '@hooks/useMutationHook';
import AxiosInstance from '@utils/axios/AxiosInstance';

const uploadImage = async () => {

  const mutationFn = async (reqData: { file: File; directory: string }) => {
    return await AxiosInstance.post(
      '/s3/image',
      {
        files: reqData.file,
        directory: reqData.directory,
      },
    ).catch(() => {
      return;
    });
  };
  
    return useMutationHook({
      mutationFn,
      },
    );
};

export const ImageAPI = {
  uploadImage,
};
