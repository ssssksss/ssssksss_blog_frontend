import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { ApiProcessHandler } from './service/ApiProcessHandler';

const addMemoCategory = (props) => {
  return ApiProcessHandler({
    url: '/api/memo/category',
    method: 'POST',
    data: {
      name: props.name,
      backgroundColor: props.backgroundColor,
    },
    apiCategory: '할일 카테고리',
    isShowMessage: true,
  });
};

const getMemoCategoryList = (_) => {
  return ApiProcessHandler({
    url: '/api/memo/category',
    method: 'GET',
    apiCategory: '할일 카테고리',
  });
};

const updateMemoCategory = (props) => {
  return ApiProcessHandler({
    url: '/api/memo/category',
    method: 'PUT',
    apiCategory: '할일 카테고리',
    data: {
      id: props.id,
      name: props.name,
      backgroundColor: props.backgroundColor,
    },
    isShowMessage: true,
  });
};

const deleteMemoCategory = (props) => {
  return ApiProcessHandler({
    url: '/api/memo/category',
    method: 'DELETE',
    apiCategory: '할일 카테고리',
    params: {
      id: props.id,
    },
    isShowMessage: true,
  });
};

const addMemo = (props) => {
  return ApiProcessHandler({
    url: '/api/memo',
    method: 'POST',
    data: {
      content: props.content,
      memoCategoryId: props.memoCategoryId,
    },
    apiCategory: '메모',
    isShowMessage: true,
  });
};

const getMemoList = (props) => {
  return ApiProcessHandler({
    url: '/api/memo',
    method: 'GET',
    apiCategory: '메모',
    params: {
      type: props.type,
    },
  });
};

const updateMemo = (props) => {
  return ApiProcessHandler({
    url: '/api/memo',
    method: 'PUT',
    apiCategory: '메모',
    data: {
      id: props.id,
      content: props.content,
    },
    isShowMessage: true,
  });
};

const deleteMemo = (props) => {
  return ApiProcessHandler({
    url: '/api/memo',
    method: 'DELETE',
    apiCategory: '메모',
    params: {
      id: props.id,
    },
  }).then((_) => {
    store.dispatch(
      rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
        type: 'success',
        message: '메모 삭제 성공',
      }),
    );
  });
};

export const MemoAPI = {
  addMemoCategory,
  getMemoCategoryList,
  updateMemoCategory,
  deleteMemoCategory,
  addMemo,
  getMemoList,
  updateMemo,
  deleteMemo,
};
