import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import AxiosInstance from '@utils/axios/AxiosInstance';
import UrlQueryStringToObject from '@utils/function/UrlQueryStringToObject';
import { useQueryClient } from 'react-query';
import { ICreateMemoCategoryProps, IMemoCommonProps, IUpdateMemoCategoryProps } from 'src/@types/memo/MemoAPI';
import { IMemoCategory } from 'src/@types/memo/memoCategory';
import { IMemoItem } from 'src/@types/memo/memoItem';

const createMemoCategory = (props: IMemoCommonProps) => {
    const queryClient = useQueryClient();
    const mutationFn = async (reqData: ICreateMemoCategoryProps) => {
      return await AxiosInstance.post('/api/memo/category', {
        name: reqData.name,
        backgroundColor: reqData.backgroundColor,
      });
    };

    return useMutationHook({
      mutationFn,
      onSuccessHandler: ({ data }) => {
        queryClient.setQueryData(['memoCategory'], (oldData: any) => {
          const _temp: IMemoCategory[] = oldData.data.memoCategoryList;
          _temp.push(data.data.data?.memoCategory);
          oldData.data.memoCategoryList = _temp;
          return oldData;
        });
        props.onSuccessHandler();
      },
    });
};

const getMemoCategoryList = () => {
  return useQueryHook({
    queryKey: ['memoCategory'],
    requestData: {
      url: '/api/memo/category',
      method: 'GET',
    },
    isRefetchWindowFocus: false,
    });
};

const updateMemoCategory = (props: IMemoCommonProps) => {
  const queryClient = useQueryClient();
    const mutationFn = async (reqData: IUpdateMemoCategoryProps) => {
      return await AxiosInstance.put('/api/memo/category', {
        id: reqData.id,
        name: reqData.name,
        backgroundColor: reqData.backgroundColor
      });
    };

    return useMutationHook({
      mutationFn,
      onSuccessHandler: ({ data }) => {
        const _memoCategoryItem = data.data.data.memoCategory;
        queryClient.setQueryData(
          ['memoCategory'],
          (oldData: {
            data: {
              memoCategoryList: IMemoCategory[];
            };
          }) => {
            const _temp: IMemoCategory[] = oldData.data.memoCategoryList.map(
              (i) => {
                if (i.id == _memoCategoryItem.id) {
                  return _memoCategoryItem;
                }
                return i;
              },
            );
            oldData.data.memoCategoryList = _temp;
            return oldData;
          },
        );
        props.onSuccessHandler();
      },
    });
};

const deleteMemoCategory = (props: IMemoCommonProps) => {
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: { id: number }) => {
    return await AxiosInstance.delete(
      `/api/memo/category?id=${reqData.id}`,
    );
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ variables }) => {
      queryClient.setQueryData(
        ['memoCategory'],
        (oldData: {
          data: {
            memoCategoryList: IMemoCategory[];
          };
        }) => {
          const _temp: IMemoCategory[] = oldData.data.memoCategoryList.filter(
            (i) => i.id != variables.id,
          );
          oldData.data.memoCategoryList = _temp;
          return oldData;
        },
      );
      const _queryStringObject = UrlQueryStringToObject(window.location.href);
      if (_queryStringObject.categoryId == variables.id) {
          window.history.replaceState(
            window.history.state,
            '',
            `/memo?active=all`,
        );
        store.dispatch(rootActions.memoStore.SET_ACTIVE_CATEGORY_ID(0));
        queryClient.setQueryData(
          ['memoList'],
          (oldData: {
            data: {
              memoList: IMemoItem[];
            };
          }) => {
            const _temp: IMemoItem[] = oldData.data.memoList.filter(
              (i) => i.memoCategory.id != variables.id,
            );
            oldData.data.memoList = _temp;
            return oldData;
          },
        );
      }
        props.onSuccessHandler();
    },
  });
};

const createMemo = () => {
    const queryClient = useQueryClient();
  const mutationFn = async (reqData: {
      content: string;
      memoCategoryId: number;
    }) => {
      return await AxiosInstance.post('/api/memo', {
        content: reqData.content,
        memoCategoryId: reqData.memoCategoryId,
      });
    };

    return useMutationHook({
      mutationFn,
      onSuccessHandler: ({ data }) => {
        const _memoItem = data.data.data;
        queryClient.setQueryData(
          ['memoList'],
          (oldData: {
            data: {
              memoList: IMemoItem[];
            };
          }) => {
            const _temp: IMemoItem[] = oldData.data.memoList;
            _temp.unshift(_memoItem);
            oldData.data.memoList = _temp;
            return oldData;
          },
        );
      },
    });
};

const getMemoList = (props: {type: string}) => {
  return useQueryHook({
    queryKey: ['memoList'],
    requestData: {
      url: '/api/memo',
      method: 'GET',
      params: {
        type: props.type,
      },
    },
    isRefetchWindowFocus: false,
  });
};

const updateMemo = () => {
  const queryClient = useQueryClient();
  const mutationFn = async (reqData: {
    id: string;
    content: string;
    memoCategoryId: number;
  }) => {
    return await AxiosInstance.put('/api/memo', {
      id: Number(reqData.id),
      content: reqData.content,
      memoCategoryId: reqData.memoCategoryId,
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      const _memoItem = data.data.data;
      queryClient.setQueryData(['memoList'], (oldData: {
        data: {
          memoList: IMemoItem[]
        }
      }) => {
        const _temp: IMemoItem[] = oldData.data.memoList.map((i) => {
          if (i.id == _memoItem.id) {
            return _memoItem;
          }
          return i;
        });
        oldData.data.memoList = _temp;
        return oldData;
      })
    },
  });
};

const deleteMemo = (id: number) => {
    const queryClient = useQueryClient();
    const mutationFn = async () => {
      return await AxiosInstance.delete(`/api/memo?id=${id}`);
    };

    return useMutationHook({
      mutationFn,
      onSuccessHandler: () => {
        queryClient.setQueryData(
          ['memoList'],
          (oldData: {
            data: {
              memoList: IMemoItem[];
            };
          }) => {
            const _temp: IMemoItem[] = oldData.data.memoList.filter((i) => i.id != id);
            oldData.data.memoList = _temp;
            return oldData;
          },
        );
      },
    });
};

export const MemoAPI = {
  createMemoCategory,
  getMemoCategoryList,
  updateMemoCategory,
  deleteMemoCategory,
  createMemo,
  getMemoList,
  updateMemo,
  deleteMemo,
};
