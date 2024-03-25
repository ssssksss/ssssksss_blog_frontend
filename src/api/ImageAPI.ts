import { ApiProcessHandler } from './service/ApiProcessHandler';

const uploadImage = async (file: unknown, directory: string) => {
  return await ApiProcessHandler({
    url: '/s3/image',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
    data: {
      files: file,
      directory: directory,
    },
    withCredentials: true,
  });
};

export const ImageAPI = {
  uploadImage,
};
