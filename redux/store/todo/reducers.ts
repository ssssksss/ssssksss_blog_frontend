import * as actions from './actions';
const initialState = {
  todoList: [],
};
export const todoReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE
) => {
  switch (action.type) {
    case 'TODO_LIST':
      return { ...state, todoList: action.payload };
    default:
      return state;
  }
};
