import { api } from "@/libs/api";
import { MutationConfig } from "@/libs/react-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { IProductProps } from "../product";
import { ProductSchemaType } from "../product-validation";

const updateProduct = async ({ 
  id,
  updatedData,
}: { 
  id: number;
  updatedData: ProductSchemaType;
}): Promise<IProductProps> => {
  const response = await api.put<IProductProps>(`/products/${id}`, updatedData);
  return response.data;
} 

type UseUpdateProductOptions = {
  mutationConfig?: MutationConfig<typeof updateProduct>;
}

const useUpdateProduct = ({ mutationConfig }: UseUpdateProductOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "products"
      });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: updateProduct,
  });
}

export { updateProduct, useUpdateProduct };
