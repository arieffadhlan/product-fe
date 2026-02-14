import { useState } from "react";

type ModalType = string;

export const useModalTable = <T extends { id: string | number }>() => {
  const [modalState, setModalState] = useState<{
    selectedData: T | undefined;
    currentModal: ModalType | undefined;
  }>({
    selectedData: undefined,
    currentModal: undefined,
  });

  const hideModal = () => {
    setModalState({
      selectedData: undefined,
      currentModal: undefined,
    });
  };

  const openModal = (data: T, type: ModalType) => {
    setModalState({
      selectedData: data,
      currentModal: type,
    });
  };

  const isModalOpen = (type: ModalType) => modalState.currentModal === type;

  return {
    isModalOpen,
    modalData: modalState.selectedData,
    openModal,
    hideModal,
  };
};
