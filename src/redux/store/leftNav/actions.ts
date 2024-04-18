export type ACTION_INSTANCE = ReturnType<typeof SET_LEFT_NAV_ITEM_ACTIVE>;

export const SET_LEFT_NAV_ITEM_ACTIVE = (payload: string) => {
  return {
    type: 'SET_LEFT_NAV_ITEM_ACTION',
    payload: payload,
  };
};
