import { api } from "@/libs/api";
import { TQueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

import { IProductProps } from "../product";

const getProductDetail = async (
  id?: number
): Promise<IProductProps> => {
  const { data } = await api.get<IProductProps>(`/products/${id}`);
  await new Promise(resolve => setTimeout(resolve, 300));

  return data; 
}

const getProductDetailQueryOptions= (id?: number) => {
  return queryOptions({
    queryKey: ["products", id],
    queryFn : () => getProductDetail(id),
  });
};

interface UseDetailProductOptions {
  id?: number;
  queryConfig?: TQueryConfig<typeof getProductDetailQueryOptions>;
};

const useProductDetail = ({ 
  id, 
  queryConfig,
}: UseDetailProductOptions) => {
  return useQuery({
    ...getProductDetailQueryOptions(id),
    ...queryConfig,
  });
}

export {
  useProductDetail,
  getProductDetail,
  getProductDetailQueryOptions,
}
