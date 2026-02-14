import { useState } from "react";

export type UseModalReturn = {
  message: string;
  visible: boolean;
  openModal: (message?: string) => void;
  hideModal: () => void;
};

export const useModal = (): UseModalReturn => {
  const [modalState, setModalState] = useState({
    message: "",
    visible: false,
  });

  const hideModal = () => setModalState({ message: "", visible: false });
  const openModal = (message = "") => setModalState({ message, visible: true });

  return {
    message: modalState.message,
    visible: modalState.visible,
    hideModal,
    openModal,
  };
};
