import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";

import type { IProductProps } from "../product";

const getProductDetail = async (id?: number): Promise<IProductProps> => {
  const { data } = await api.get<IProductProps>(`/products/${id}`);
  return data;
};

const getProductDetailQueryOptions = (id?: number) => {
  return queryOptions({
    queryKey: ["products", id],
    queryFn: () => getProductDetail(id),
    enabled: !!id,
  });
};

interface UseDetailProductOptions {
  id?: number;
  queryConfig?: TQueryConfig<typeof getProductDetailQueryOptions>;
}

const useProductDetail = ({ id, queryConfig }: UseDetailProductOptions) => {
  return useQuery({
    ...getProductDetailQueryOptions(id),
    ...queryConfig,
  });
};

export { useProductDetail, getProductDetail, getProductDetailQueryOptions };
