import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useQueryClient } from 'react-query';

const addTodo = (props) => {
  const queryClient = useQueryClient();
  const mutationFn = async (reqData) => {
    return await AxiosInstance.post(
      '/api/todo',
      {
        content: reqData.content,
      },
      { withCredentials: true },
    );
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      props.onSuccessHandler();
      queryClient.setQueryData(['todoList'], (oldData) => {
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

const updateTodo = (props) => {
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: {id: number, content: string}) => {
    return await AxiosInstance.patch(
      '/api/todo',
      {
        id: reqData?.id,
        content: reqData?.content,
      },
      { withCredentials: true },
    );
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      queryClient.setQueryData(['todoList'], (oldData) => {
        console.log("TodoAPI.ts 파일 : ",oldData);
        oldData.data.todoList = oldData.data?.todoList?.map((i) => {
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
  const mutationFn = async (reqData: {id: number}) => {
    return await AxiosInstance.delete(`/api/todo?id=${reqData?.id}`, {
      withCredentials: true,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      queryClient.setQueryData(['todoList'], (oldData) => {
        console.log("TodoAPI.ts 파일 : ",oldData);
        oldData.data.todoList = oldData.data?.todoList?.filter(
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
    return await AxiosInstance.patch(
      '/api/todo/check',
      {
        id: reqData?.id,
      },
      { withCredentials: true }
    ).catch(() => {
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
