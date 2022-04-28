const AUTH = "AUTH";

export type ACTION_INSTANCE = ReturnType<typeof AUTH_ACTION>;

type AUTH_STATE = {
  authParameter: {
    email: string;
    role: string;
  };
};
export const AUTH_ACTION = (payload: AUTH_STATE) => {
  return {
    type: AUTH,
    payload: payload.authParameter,
  };
};
