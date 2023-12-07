import * as actions from './actions';
const initialState = {
  todayTodoList: [],
};
export const todoReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE
) => {
  switch (action.type) {
    case 'TODAY_TODO_LIST':
      return { ...state, todayTodoList: action.payload };
    default:
      return state;
  }
};
