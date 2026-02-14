import { create } from "zustand";

type ModalState = {
  visible: boolean;
  message: string;
};

type ModalStore = {
  modals: Record<string, ModalState>;
  hideModal: (key: string) => void;
  openModal: (key: string, message?: string) => void;
};

export const useModalStoreImpl = create<ModalStore>((set) => ({
  modals: {},
  hideModal: (key) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [key]: { ...state.modals[key], visible: false },
      },
    })),
  openModal: (key, message = "") =>
    set((state) => ({
      modals: {
        ...state.modals,
        [key]: { ...state.modals[key], message, visible: true },
      },
    })),
}));
