export type ACTION_INSTANCE = ReturnType<typeof SET_TOASTIFY_MESSAGE>;

/**
 * @param type
 * success, error, warning, info, default
 * @param message
 * 보여줄 메시지 입력
 */
type TOASTIFY_MESSAGE_STATE = {
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
  message: string;
};

export const SET_TOASTIFY_MESSAGE = (payload: TOASTIFY_MESSAGE_STATE) => {
  return {
    type: 'TOASTIFY_MESSAGE',
    payload: payload,
  };
};

const toastifyAction = {
  SET_TOASTIFY_MESSAGE,
};

export default toastifyAction;
