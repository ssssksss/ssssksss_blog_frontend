export type ACTION_INSTANCE = ReturnType<typeof SET_TODAY_TODO_LIST>;

type TODAY_TODO_STATE = {
  todayTodoList: [];
};
export const SET_TODAY_TODO_LIST = (payload: TODAY_TODO_STATE) => {
  return {
    type: 'TODAY_TODO_LIST',
    payload: payload,
  };
};
