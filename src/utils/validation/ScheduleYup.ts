import * as yup from "yup";

export const ScheduleCategoryCreateYup = yup.object().shape({
  createScheduleName: yup.string().required("필수 입력"),
});

export const ScheduleCategoryUpdateYup = yup.object().shape({
  updatePickScheduleId: yup.string().required("필수 입력"),
  updateScheduleTitle: yup.string().required("필수 입력"),
  updateScheduleBackgroundColor: yup.string().required("필수 입력"),
});

export const ScheduleCategoryDeleteYup = yup.object().shape({
  deleteScheduleId: yup.string().required("필수 입력"),
});
