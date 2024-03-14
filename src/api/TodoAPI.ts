import { useMutationHook } from '@components/useHook/useMutationHook';
import { UseQueryHook } from '@components/useHook/useQueryHook';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useQueryClient } from 'react-query';

const addTodo = (props) => {
  const queryClient = useQueryClient();
  const mutationFn = async (reqData) => {
    return await AxiosInstance.post('/api/todo', {
      content: reqData.content,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      props.onSuccessHandler();
      queryClient.setQueryData(['todoList'], (oldData) => {
        oldData.json.todoList.unshift(data.data.json.todo);
        return oldData;
      });
    },
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
  const queryClient = useQueryClient();
  const mutationFn = async (reqData) => {
    return await AxiosInstance.patch('/api/todo', {
      id: reqData?.id,
      content: reqData?.content,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      queryClient.setQueryData(['todoList'], (oldData) => {
        oldData.json.todoList = oldData.json.todoList.map((i) => {
          if (i.id == variables.id) {
            return {
              ...i,
              content: variables.content,
            };
          }
          return i;
        });
        return oldData;
      });
      props.onSuccessHandler();
    },
  });
};

const deleteTodo = (props) => {
  const queryClient = useQueryClient();
  const mutationFn = async (reqData) => {
    return await AxiosInstance.delete(`/api/todo?id=${reqData?.id}`);
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      queryClient.setQueryData(['todoList'], (oldData) => {
        oldData.json.todoList = oldData.json.todoList.filter(
          (i) => i.id != variables.id,
        );
        return oldData;
      });
      props.onSuccessHandler();
    },
  });
};

const toggleCheckTodo = (props) => {
  const mutationFn = async (reqData) => {
    return await AxiosInstance.patch('/api/todo/check', {
      id: reqData?.id,
    }).catch((_) => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onErrorHandler: () => {
      props.onErrorHandler();
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
