import useUserStore from "@store/userStore";
import { useEffect } from "react";

export const useInitGetUser = () => {
  const userStore = useUserStore();

  useEffect(() => {
    const getInitUser = async () => {
      try {

        const response = await fetch("/api/user");
        if (!response.ok) {
          userStore.setUser({id: -1});
          return;
        }
        const result = await response.json();
        userStore.setUser({...result.data});
      } catch {
        userStore.setUser({id: -1});
      }
    };
    getInitUser();
  }, []);

  return { userStore };
};
