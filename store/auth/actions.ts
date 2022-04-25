const AUTH_ACCESS_TOKEN = "AUTH_ACCESS_TOKEN";

export type ACTION_INSTANCE = ReturnType<typeof AUTH_ACCESS_ACTION>;

type AUTH_ACCESS_STATE = {
  accessToken: string;
};
export const AUTH_ACCESS_ACTION = (payload: AUTH_ACCESS_STATE) => {
  return {
    type: AUTH_ACCESS_TOKEN,
    payload: payload.accessToken,
  };
};
