import { store } from '@/redux/store';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import axios from 'axios';
import { ApiProcessHandler } from './service/ApiProcessHandler';

const addTodo = async props => {
  return await ApiProcessHandler({
    url: '/api/todo',
    method: 'POST',
    data: {
      content: props.content,
    },
    apiCategory: '할일',
  });
};

export const TodoAPI = {
  addTodo,
};
