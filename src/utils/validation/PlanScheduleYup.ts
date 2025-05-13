import * as yup from "yup";

export const PlanCreateScheduleYup = yup.object().shape({
  title: yup.string().required("필수 입력"),
  content: yup.string().required("필수 입력"),
  status: yup.string().required("필수 입력"),
  // scheduleStartDate: yup.string().length(1).required("필수 입력"),
  // scheduleEndDate: yup.string().length(1).required("필수 입력"),
  planScheduleCategory: yup.number().min(1).required("필수 입력"),
});

export const PlanUpdateScheduleYup = yup.object().shape({
  id: yup.number().min(1).required("필수 입력"),
  title: yup.string().required("필수 입력"),
  content: yup.string().required("필수 입력"),
  status: yup.string().required("필수 입력"),
  // scheduleStartDate: yup.string().length(1).required("필수 입력"),
  // scheduleEndDate: yup.string().length(1).required("필수 입력"),
  planScheduleCategory: yup.number().min(1).required("필수 입력"),
});
