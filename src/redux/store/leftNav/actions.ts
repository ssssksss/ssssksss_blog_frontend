export type ACTION_INSTANCE = ReturnType<typeof SET_LEFT_NAV_ITEM_ACTIVE>;

type LEFT_ACTIVE_ITEM_STATE = {
  leftNavActiveItem: string;
};
export const SET_LEFT_NAV_ITEM_ACTIVE = (payload: LEFT_ACTIVE_ITEM_STATE) => {
  return {
    type: 'SET_LEFT_NAV_ITEM_ACTION',
    payload: payload,
  };
};
