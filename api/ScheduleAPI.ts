import { useMutationHook } from '@/components/useHook/useMutationHook';
import { UseQueryHook } from '@/components/useHook/useQueryHook';
import { store } from '@/redux/store';
import { rootActions } from '@/redux/store/actions';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { useSelector } from 'react-redux';
import { ApiProcessHandler } from './service/ApiProcessHandler';

const addScheduleCategory = props => {
  return ApiProcessHandler({
    url: '/api/schedule/category',
    method: 'POST',
    data: {
      name: props.name,
      backgroundColor: props.backgroundColor,
    },
    apiCategory: '할일 카테고리',
    isShowMessage: true,
  });
};

const getScheduleCategoryList = props => {
  const authStore = useSelector(state => state.authStore);
  return UseQueryHook({
    queryKey: ['scheduleCategoryList', authStore.id],
    requestData: {
      url: '/api/schedule/category',
      method: 'GET',
    },
    isRefetchWindowFocus: false,
    enabled: authStore.id != undefined,
  });
};

const updateScheduleCategory = props => {
  const mutationFn = async reqData => {
    return await AxiosInstance.put('/api/schedule/category', {
      id: reqData.id,
      name: reqData.name,
      backgroundColor: reqData.backgroundColor,
    }).catch(error => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      props.onSuccessHandler();
    },
    onErrorHandler: ({ error, variables, context }) => {},
    onSettledHandler: ({ data, error, variables, context }) => {},
  });
};

const deleteScheduleCategory = props => {
  const mutationFn = async reqData => {
    return await AxiosInstance.delete(
      `/api/schedule/category?id=${reqData.id}`
    ).catch(error => {
      return;
    });
  };
  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data, variables, context }) => {
      props.onSuccessHandler(data);
      store.dispatch(
        rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
          type: 'success',
          message: '카테고리 삭제',
        })
      );
    },
    onErrorHandler: ({ error, variables, context }) => {},
    onSettledHandler: ({ data, error, variables, context }) => {},
  });
};

const addSchedule = props => {
  return ApiProcessHandler({
    url: '/api/schedule',
    method: 'POST',
    data: {
      title: props.title,
      content: props.content,
      startDateTime: props.startDateTime,
      endDateTime: props.endDateTime,
      scheduleCategoryId: props.scheduleCategoryId,
    },
    apiCategory: '할일',
    isShowMessage: true,
  });
};

const getScheduleList = props => {
  const authStore = useSelector(state => state.authStore);
  return UseQueryHook({
    queryKey: ['scheduleList'],
    requestData: {
      url: '/api/schedule',
      method: 'GET',
      params: {
        type: props.type,
      },
    },
    isRefetchWindowFocus: false,
    onSuccessHandler: () => {},
    enabled: authStore.id,
  });
};

const getScheduleListTEST = props => {
  const scheduleStore = useSelector(state => state.scheduleStore);
  const authStore = useSelector(state => state.authStore);
  const { type, startDateTime, endDateTime } = props;
  return UseQueryHook({
    queryKey: [
      'scheduleList',
      store.getState().scheduleStore.calendarMonth,
      authStore.id,
    ],
    requestData: {
      url: `/api/schedule?type=${props.type}&startDateTime=${scheduleStore.calendar.startDateOfMonth}T00:00:00.000Z&endDateTime=${scheduleStore.calendar.endDateOfMonth}T00:00:00.000Z`,
      method: 'GET',
    },
    isRefetchWindowFocus: false,
    enabled: [startDateTime, endDateTime, type, authStore.id],
  });
};

const updateSchedule = props => {
  return ApiProcessHandler({
    url: '/api/schedule',
    method: 'PUT',
    data: {
      id: props.id,
      title: props.title,
      content: props.content,
      startDateTime: props.startDateTime,
      endDateTime: props.endDateTime,
      scheduleCategoryId: props.scheduleCategoryId,
    },
    apiCategory: '할일',
    isShowMessage: true,
  });
};

const deleteSchedule = props => {
  return ApiProcessHandler({
    url: '/api/schedule',
    method: 'DELETE',
    params: {
      id: props.id,
    },
    apiCategory: '할일',
    isShowMessage: true,
  });
};

const toggleCheckSchedule = props => {
  return ApiProcessHandler({
    url: '/api/schedule/check',
    method: 'PATCH',
    apiCategory: '할일 체크',
    data: {
      id: props.id,
    },
  });
};

const toggleCheckScheduleCategory = props => {
  return ApiProcessHandler({
    url: '/api/schedule/category/check',
    method: 'PATCH',
    apiCategory: '할일 체크',
    data: {
      id: props.id,
    },
  });
};

export const ScheduleAPI = {
  addScheduleCategory,
  getScheduleCategoryList,
  updateScheduleCategory,
  deleteScheduleCategory,
  addSchedule,
  getScheduleList,
  updateSchedule,
  deleteSchedule,
  toggleCheckSchedule,
  toggleCheckScheduleCategory,
  getScheduleListTEST,
};
