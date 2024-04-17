import { useState, useCallback } from 'react';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file useModal.tsx
 * @version 0.0.1 "2023-09-23 02:09:26"
 * @description 설명
 */

const OPTION = {
  show: false,
  title: '',
  onSubmit: () => {},
  onClose: () => {},
  element: null,
};

const useModal = () => {
  const [modalOption, setModalOption] = useState(OPTION);

  const showModal = useCallback(
    (show, title, onSubmitCallback, onCloseCallback, element) => {
      setModalOption(prev => ({
        ...prev,
        show,
        title,
        onSubmit: () => {
          if (onSubmitCallback) onSubmitCallback();
          setModalOption(prev => ({ ...prev, show: false }));
        },
        onClose: () => {
          if (onCloseCallback) onCloseCallback();
          setModalOption(prev => ({ ...prev, show: false }));
        },
        element,
      }));
    },
    [modalOption]
  );

  return [modalOption, showModal];
};

export default useModal;
