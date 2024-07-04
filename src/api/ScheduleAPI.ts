import { useMutationHook } from '@hooks/useMutationHook';
import { useQueryHook } from '@hooks/useQueryHook';
import { store } from '@redux/store';
import { RootState } from '@redux/store/reducers';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { useSelector } from 'react-redux';
import ApiProcessHandler from './service/ApiProcessHandler';

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

const updateScheduleCategory = (props: {onSuccessHandler: () => void}) => {
  const mutationFn = async (reqData: {id: number, name: string, backgroundColor: string}) => {
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

const deleteScheduleCategory = (props: {onSuccessHandler: () => void}) => {
  const mutationFn = async (reqData: {id: number}) => {
    return await AxiosInstance.delete(
      `/api/schedule/category?id=${reqData.id}`,
    ).catch(() => {
      return;
    });
  };
  return useMutationHook({
    mutationFn,
    onSuccessHandler: ({ data }) => {
      props.onSuccessHandler();
    },
  });
};

const addSchedule = (props: {
  title: string;
  content: string;
  startDateTime: string; 
  endDateTime: string; 
  scheduleCategoryId: number; 
}) => {
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

const getScheduleList = (props: {type: string}) => {
  const authStore = useSelector((state: RootState) => state.authStore);
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

const getScheduleListTEST = ({type, startDateTime, endDateTime}: {type: string, startDateTime: string, endDateTime: string}) => {
  const scheduleStore = useSelector((state:RootState) => state.scheduleStore);
  const authStore = useSelector((state: RootState) => state.authStore);
  return useQueryHook({
    queryKey: [
      'scheduleList',
      store.getState().scheduleStore.calendarMonth,
      authStore.id,
    ],
    requestData: {
      url: `/api/schedule?type=${type}&startDateTime=${scheduleStore.calendar.startDateOfMonth}T00:00:00.000Z&endDateTime=${scheduleStore.calendar.endDateOfMonth}T00:00:00.000Z`,
      method: 'GET',
    },
    isRefetchWindowFocus: false,
    enabled: [!!startDateTime, !!endDateTime, !!type, !!authStore.id],
  });
};

const updateSchedule = (props: {
  id: number; 
  title: string;
  content: string;
  startDateTime: string; 
  endDateTime: string; 
  scheduleCategoryId: number;
}) => {
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

const deleteSchedule = (props: {id: number}) => {
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

const toggleCheckSchedule = (props: {id: number}) => {
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

const toggleCheckScheduleCategory = (props: {id: number}) => {
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
