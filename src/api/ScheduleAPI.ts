import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { store } from '@redux/store';
import { RootState } from '@redux/store/reducers';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useSelector } from 'react-redux';
import { ApiProcessHandler } from './service/ApiProcessHandler';

const addScheduleCategory = (props: {name: string, backgroundColor: string}) => {
  // TODO API 수정 필요
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

const getScheduleCategoryList = () => {
  const authStore = useSelector((state:RootState) => state.authStore);
  return useQueryHook({
    queryKey: ['scheduleCategoryList', authStore.id],
    requestData: {
      url: '/api/schedule/category',
      method: 'GET',
    },
    isRefetchWindowFocus: false,
    refetchOnMount: false,
    enabled: !!authStore.id,
  });
};

const updateScheduleCategory = (props) => {
  const mutationFn = async (reqData) => {
    return await AxiosInstance.put(
      '/api/schedule/category',
      {
        id: reqData.id,
        name: reqData.name,
        backgroundColor: reqData.backgroundColor,
      },
    ).catch(() => {
      return;
    });
  };

  return useMutationHook({
    mutationFn,
    onSuccessHandler: () => {
      props.onSuccessHandler();
    },
  });
};

const deleteScheduleCategory = (props) => {
  const mutationFn = async (reqData) => {
    return await AxiosInstance.delete(
      `/api/schedule/category?id=${reqData.id}`,
    ).catch(() => {
      return;
    });
  };
  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      props.onSuccessHandler(data);
    },
  });
};

const addSchedule = (props) => {
  // TODO API 수정 필요
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

const getScheduleList = (props) => {
  const authStore = useSelector((state) => state.authStore);
  return useQueryHook({
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
    enabled: !!authStore.id,
  });
};

const getScheduleListTEST = (props) => {
  const scheduleStore = useSelector((state) => state.scheduleStore);
  const authStore = useSelector((state) => state.authStore);
  const { type, startDateTime, endDateTime } = props;
  return useQueryHook({
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
    enabled: [!!startDateTime, !!endDateTime, !!type, !!authStore.id],
  });
};

const updateSchedule = (props) => {
  // TODO API 수정 필요
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

const deleteSchedule = (props) => {
  // TODO API 수정 필요
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

const toggleCheckSchedule = (props) => {
  // TODO API 수정 필요
  return ApiProcessHandler({
    url: '/api/schedule/check',
    method: 'PATCH',
    apiCategory: '할일 체크',
    data: {
      id: props.id,
    },
  });
};

const toggleCheckScheduleCategory = (props) => {
  // TODO API 수정 필요
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
