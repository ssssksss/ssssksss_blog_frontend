export type ACTION_INSTANCE = ReturnType<typeof SET_TODO_LIST>;

type TODO_LIST_STATE = {
  todoList: [];
};
export const SET_TODO_LIST = (payload: TODO_LIST_STATE) => {
  return {
    type: 'TODO_LIST',
    payload: payload,
  };
};

const todoAction = {
  SET_TODO_LIST,
};

export default todoAction;
