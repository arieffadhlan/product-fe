import { api } from "@/libs/api";
import { MutationConfig } from "@/libs/react-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { IProductProps } from "../product";
import { ProductSchemaType } from "../product-validation";

const createProduct = async ({ 
  data, 
}: { 
  data: ProductSchemaType; 
}): Promise<IProductProps> => {
  return api.post("products/add", data).then(response => response.data);
} 

type UseCreateProductOptions = {
  mutationConfig?: MutationConfig<typeof createProduct>;
}

const useCreateProduct = ({ mutationConfig }: UseCreateProductOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "products",
      });
      onSuccess?.(data, ...args);
    },
    ...rest,
    mutationFn: createProduct,
  });
}

export { createProduct, useCreateProduct };
