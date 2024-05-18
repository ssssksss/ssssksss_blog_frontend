import { useMutationHook } from '@hooks/useMutationHook';
import AxiosInstance from '@utils/axios/AxiosInstance';

const uploadImage = async () => {
  // return await ApiProcessHandler({
  //   url: '/s3/image',
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     'Access-Control-Allow-Origin': '*',
  //   },
  //   data: {
  //     files: file,
  //     directory: directory,
  //   },
  //   withCredentials: true,
  // });

  const mutationFn = async (reqData: { file: File; directory: string }) => {
    return await AxiosInstance.post(
      '/s3/image',
      {
        files: reqData.file,
        directory: reqData.directory,
      },
      {
        withCredentials: true,
      },
    ).catch(() => {
      return;
    });
  };
  
    return useMutationHook({
      mutationFn,
      // onSuccessHandler: ({ data, variables, context}) => {},
      // onErrorHandler: ({ error, variables, context}) => {},
      // onSettledHandler: ({ data, error, variables, context}) => {},
      },
    );
};

export const ImageAPI = {
  uploadImage,
};
