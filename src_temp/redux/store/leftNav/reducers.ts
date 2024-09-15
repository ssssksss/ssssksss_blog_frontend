import * as actions from './actions';
const initialState = {
  leftNavActiveItem: 'home',
};
export const leftNavItemReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE
) => {
  switch (action.type) {
    case 'SET_LEFT_NAV_ITEM_ACTION':
      return { ...state, leftNavActiveItem: action.payload };
    default:
      return state;
  }
};
