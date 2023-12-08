export type ACTION_INSTANCE = ReturnType<typeof SET_TODO_LIST>;

type TODO_STATE = {
  todoList: [];
};
export const SET_TODO_LIST = (payload: TODO_STATE) => {
  return {
    type: 'TODO_LIST',
    payload: payload,
  };
};
