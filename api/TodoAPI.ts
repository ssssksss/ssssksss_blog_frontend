import { store } from '@/redux/store';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import axios from 'axios';
import { ApiProcessHandler } from './service/ApiProcessHandler';

const addTodo = props => {
  return ApiProcessHandler({
    url: '/api/todo',
    method: 'POST',
    data: {
      content: props.content,
    },
    apiCategory: '할일',
    isShowMessage: true,
  });
};

const getTodoList = props => {
  return ApiProcessHandler({
    url: '/api/todo',
    method: 'GET',
    apiCategory: '할일',
  });
};

const updateTodo = props => {
  return ApiProcessHandler({
    url: '/api/todo',
    method: 'PATCH',
    apiCategory: '할일',
    data: {
      id: props.id,
      content: props.content,
    },
    isShowMessage: true,
  });
};

const removeTodo = props => {
  return ApiProcessHandler({
    url: '/api/todo',
    method: 'DELETE',
    apiCategory: '할일',
    data: {
      id: props.id,
    },
  });
};

const toggleCheckTodo = props => {
  return ApiProcessHandler({
    url: '/api/todo/check',
    method: 'PATCH',
    apiCategory: '할일 체크',
    data: {
      id: props.id,
    },
  });
};

export const TodoAPI = {
  addTodo,
  getTodoList,
  updateTodo,
  removeTodo,
  toggleCheckTodo,
};
