import { store } from '@/redux/store';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import axios from 'axios';
import { ApiProcessHandler } from './service/ApiProcessHandler';

const uploadImage = async (file: any, directory: string) => {
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
