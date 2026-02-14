import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { useModalStore } from "@/hooks/use-modal-store";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { Button } from "@/components/button";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { getErrorMessage } from "@/utils/error";
import { useForm } from "react-hook-form";
import ModalAction from "@/components/modals/modal-action";
import { ProductSchema, ProductSchemaType } from "../product-validation";
import { useCreateProduct } from "../api/create-product";
import { Input } from "@/components/input";

export default function CreateProduct() {
  const modalCreate = useModal();
  const modalSuccess = useModalStore("modalSuccessProduct");
  const modalFailed = useModalStore("modalFailedProduct");
  const modalSubmit = useModalConfirmStore("modalSubmitProduct");

  const mutation = useCreateProduct({});
  
  const { 
    reset, 
    register, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm<ProductSchemaType>({
    resolver: valibotResolver(ProductSchema),
    shouldFocusError: false,
    shouldUnregister: false,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleCancel = () => {
    reset();
    modalCreate.hideModal();
  }

  const handleUpdate = (data: ProductSchemaType) => {
    modalSubmit.handleConfirm({
      heading: "Confirm New Product",
      message: "Are you sure you want to save this data? Make sure all information is correct before continuing.",
      onCancel: modalSubmit.hideModal,
      onSubmit: async () => {
        try {
          await mutation.mutateAsync({ data });

          handleCancel();
          modalSubmit.hideModal();
          modalSuccess.openModal("Product has been successfully created.");
        } catch (error) {
          modalSubmit.hideModal();
          modalFailed.openModal(getErrorMessage(error));
        }
      },
    });
  }

  return (
    <>
      <Button
        size="md"
        text={"Add New Product"}
        icon={<Plus size={20}/>}
        onClick={() => modalCreate.openModal()} 
      />
      <ModalAction 
        heading="Add New Product" 
        visible={modalCreate.visible} 
        onClose={handleCancel}  
        hideBtnClose
      >
        <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col gap-5">
          <Input 
            placeholder="ex. Product Name"
            label="Title"
            error={errors.title?.message}
            {...register("title")} 
          />
          <div className="grid grid-cols-2 gap-3 w-full mt-2">
            <Button type="button" text="Cancel" variant="outline" fullWidth disabled={mutation.isPending} onClick={handleCancel} />
            <Button type="submit" text="Submit" variant="primary" fullWidth disabled={mutation.isPending || !isValid} />
          </div>
        </form>
      </ModalAction>
    </>
  )
}
