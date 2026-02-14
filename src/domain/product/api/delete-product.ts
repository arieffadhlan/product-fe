import { api } from "@/libs/api";
import { MutationConfig } from "@/libs/react-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const deleteProduct = ({ 
  id,
}: { 
  id: number;
}): Promise<void> => {
  return api.delete(`/products/${id}`);
} 

type UseDeleteProductOptions = {
  mutationConfig?: MutationConfig<typeof deleteProduct>;
}

const useDeleteProduct = ({ mutationConfig }: UseDeleteProductOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "products",
      });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: deleteProduct,
  });
}

export { deleteProduct, useDeleteProduct };
