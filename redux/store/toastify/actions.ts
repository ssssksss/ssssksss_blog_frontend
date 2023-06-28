export type ACTION_INSTANCE = ReturnType<typeof SET_TOASTIFY_MESSAGE>;

type TOASTIFY_MESSAGE_STATE = {
  type: String;
  message: String;
};
/**
 * @param 배경색 테마를 지정하는 함수
 * success, error, warning, info, default
 */
export const SET_TOASTIFY_MESSAGE = (payload: TOASTIFY_MESSAGE_STATE) => {
  return {
    type: "TOASTIFY_MESSAGE",
    payload: payload,
  };
};
