import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useQueryClient } from 'react-query';

const addTodo = (props: {onSuccessHandler: () => void}) => {
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: {content: string}) => {
    return await AxiosInstance.post(
      '/api/todo',
      {
        content: reqData.content,
      },
    );
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      props.onSuccessHandler();
      queryClient.setQueryData(['todoList'], (oldData: {data: {todoList: unknown[]}}) => {
        oldData.data?.todoList.unshift(data.data.data?.todo);
        return oldData;
      });
    },
  });
};

const getTodoList = () => {
  return useQueryHook({
    queryKey: ['todoList'],
    requestData: {
      url: '/api/todo',
      method: 'GET',
    },
    isRefetchWindowFocus: false,
  });
};

const updateTodo = (props: { onSuccessHandler: () => void }) => {
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: { id: number; content: string }) => {
    return await AxiosInstance.patch('/api/todo', {
      id: reqData?.id,
      content: reqData?.content,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      queryClient.setQueryData(
        ['todoList'],
        (oldData: { data: { todoList: unknown[] } }) => {
          oldData.data.todoList = oldData.data?.todoList?.map((i: {id:number}) => {
            if (i.id == variables.id) {
              return {
                ...i,
                content: variables.content,
              };
            }
            return i;
          });
          return oldData;
        },
      );
      props.onSuccessHandler();
    },
  });
};

const deleteTodo = (props: { onSuccessHandler: () => void }) => {
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: { id: number }) => {
    return await AxiosInstance.delete(`/api/todo?id=${reqData?.id}`);
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      queryClient.setQueryData(['todoList'], (oldData: {data: {todoList: unknown[]}}) => {
        oldData.data.todoList = oldData.data?.todoList?.filter(
          (i: {id: number}) => i.id != variables.id,
        );
        return oldData;
      });
      props.onSuccessHandler();
    },
  });
};

const toggleCheckTodo = (props: { onErrorHandler: () => void }) => {
  const mutationFn = async (reqData: {id: number}) => {
    return await AxiosInstance.patch('/api/todo/check', {
      id: reqData?.id,
    }).catch(() => {
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
