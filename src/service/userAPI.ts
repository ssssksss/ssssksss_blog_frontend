// import { ISignUserProps } from "../@types/api/userAPI";

const signInUser = async (args: ISignUserProps) => {
  return {
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
    bodyData: args,
    credentials: true,
    method: 'PUT',
  };
};

const initGetUser = async () => {
  return {
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
    methods: "GET",
  };
}

export const UserAPI = {
  signInUser,
  initGetUser,
};
