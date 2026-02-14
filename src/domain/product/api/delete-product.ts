import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { MutationConfig } from "@/libs/react-query";

interface DeleteProductResponse {
  id: number;
  isDeleted: boolean;
  deletedOn: string;
}

const deleteProduct = async ({ id }: { id: number }): Promise<DeleteProductResponse> => {
  const response = await api.delete<DeleteProductResponse>(`/products/${id}`);
  return response.data;
};

type UseDeleteProductOptions = {
  mutationConfig?: MutationConfig<typeof deleteProduct>;
};

const useDeleteProduct = ({ mutationConfig }: UseDeleteProductOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === "products",
      });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: deleteProduct,
  });
};

export { deleteProduct, useDeleteProduct };
