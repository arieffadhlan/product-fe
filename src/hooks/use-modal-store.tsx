import { useModalStoreImpl } from "@/store/modal-store";

export const useModalStore = (key: string) => {
  const store = useModalStoreImpl();

  const openModal = (message?: string) => store.openModal(key, message);
  const hideModal = () => store.hideModal(key);

  const visible = store.modals[key]?.visible || false;
  const message = store.modals[key]?.message || "";

  return { visible, message, openModal, hideModal };
};
