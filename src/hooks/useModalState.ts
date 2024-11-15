"use client";

import { useCallback, useState } from "react";


const useModalState = (initState?: boolean) => {
  const [isOpen, setIsOpen] = useState(
    initState ? initState : false,
  );

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModalState;
