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

  // 제출 성공이후 모달창만 닫으면 history가 남아서 뒤로가기시 스택이 남아있음
  const closeModalAfterSuccess = useCallback(() => {
    if (history.state.isModal) {
      window.history.back();
    }
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    closeModalAfterSuccess,
  };
};

export default useModalState;
