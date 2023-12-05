import * as actions from './actions';
const initialState = {
  temp1: 'temp1',
  temp2: 'temp2',
};
export const categoryReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE
) => {
  switch (action.type) {
    case 'COPY1_ACTION':
      return { ...state, temp1: action.payload };
    case 'COPY2_ACTION':
      return { ...state, temp2: action.payload };
    default:
      return state;
  }
};
