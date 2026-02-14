import { useDeleteProduct } from "../api/delete-product";
import { useModalStore } from "@/hooks/use-modal-store";
import ModalDelete from "@/components/modals/modal-delete";
import { useModalConfirm } from "@/hooks/use-modal-confirm";
import { getErrorMessage } from "@/utils/error";

export default function DeleteProduct({ id, handleClosed }: { id: number; handleClosed: () => void; }) {
  const mutation = useDeleteProduct({});
  
  const modalDelete = useModalConfirm();
  const modalSuccess = useModalStore("modalSuccessProduct");
  const modalFailed = useModalStore("modalFailedProduct");
  
  const handleCancel = () => {
    handleClosed();
    modalDelete.hideModal();
  }
  
  const handleDelete = async () => {
    try {
      await mutation.mutateAsync({ id });

      handleClosed();
      modalDelete.hideModal();
      modalSuccess.openModal("Product has been successfully deleted");
    } catch (error) {
      handleClosed();
      modalDelete.hideModal();
      modalFailed.openModal(getErrorMessage(error));
    }
  }
  
  return (
    <ModalDelete 
      visible={true} 
      loading={mutation.isPending} 
      heading="Confirm Delete Product" 
      message="This action will delete this data permanently and you can't undo this action. Are you sure you want to continue?"
      onSubmit={handleDelete} 
      onCancel={handleCancel} 
    />
  )
}
