import * as actions from './actions';

const initialState = {};

export const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LEFT_NAVBAR':
      return {
        ...state,
      };
    default:
      return state;
  }
};
