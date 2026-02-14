import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import ModalAction from "@/components/modals/modal-action";
import { useModalConfirmStore } from "@/hooks/use-modal-confirm-store";
import { useModalStore } from "@/hooks/use-modal-store";
import { getErrorMessage } from "@/utils/error";
import { useProductDetail } from "../api/detail-product";
import { useUpdateProduct } from "../api/update-product";
import { ProductSchema, type ProductSchemaType } from "../product-validation";

export default function UpdateProduct({ id, handleClosed }: { id: number; handleClosed: () => void }) {
  const mutation = useUpdateProduct({});
  const { data: details, isLoading: detailsLoading } = useProductDetail({
    id,
    queryConfig: { enabled: !!id },
  });

  const modalSucces = useModalStore("modalSuccesProduct");
  const modalFailed = useModalStore("modalFailedProduct");
  const modalSubmit = useModalConfirmStore("modalSubmitProduct");

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProductSchemaType>({
    resolver: valibotResolver(ProductSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
    shouldUnregister: false,
    values: details ? { ...details } : undefined,
  });

  const handleCancel = () => {
    reset();
    handleClosed();
  };

  const handleUpdate = (updatedData: ProductSchemaType) => {
    modalSubmit.handleConfirm({
      heading: "Confirm Update Product",
      message: "This update will overwrite the current information. Are you sure you want to proceed?",
      onCancel: modalSubmit.hideModal,
      onSubmit: async () => {
        try {
          await mutation.mutateAsync({ id, updatedData });

          handleCancel();
          modalSubmit.hideModal();
          modalSucces.openModal("Product has been successfully updated.");
        } catch (error) {
          modalSubmit.hideModal();
          modalFailed.openModal(getErrorMessage(error));
        }
      },
    });
  };

  return (
    <ModalAction visible={true} onClose={handleCancel} heading="Update Product" hideBtnClose>
      <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col gap-5">
        <Input
          disabled={detailsLoading}
          placeholder={detailsLoading ? "Load data..." : "ex. Product Name"}
          label="Title"
          error={errors.title?.message}
          {...register("title")}
        />
        <div className="grid grid-cols-2 gap-3 w-full mt-2">
          <Button
            type="button"
            text="Cancel"
            variant="outline"
            fullWidth
            disabled={mutation.isPending}
            onClick={handleCancel}
          />
          <Button type="submit" text="Update" variant="primary" fullWidth disabled={mutation.isPending || !isValid} />
        </div>
      </form>
    </ModalAction>
  );
}
