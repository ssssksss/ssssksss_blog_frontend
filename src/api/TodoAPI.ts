import { UseQueryHook } from '@components/useHook/useQueryHook';
import { ApiProcessHandler } from './service/ApiProcessHandler';

const addTodo = (props) => {
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

const getTodoList = (_) => {
  return UseQueryHook({
    queryKey: ['todoList'],
    requestData: {
      url: '/api/todo',
      method: 'GET',
    },
    isRefetchWindowFocus: false,
  });
};

const updateTodo = (props) => {
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

const deleteTodo = (props) => {
  return ApiProcessHandler({
    url: '/api/todo',
    method: 'DELETE',
    apiCategory: '할일',
    params: {
      id: props.id,
    },
    isShowMessage: true,
  });
};

const toggleCheckTodo = (props) => {
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
  deleteTodo,
  toggleCheckTodo,
};
