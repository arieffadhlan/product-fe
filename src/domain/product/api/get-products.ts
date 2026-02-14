import { api } from "@/libs/api";
import { TQueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { 
  IProductQuery,
  IProductsResponse,
} from "../product";

const getProducts = async (
  params: IProductQuery = {}
): Promise<IProductsResponse> => {
  const { data } = await api.get<IProductsResponse>(
    params.q 
      ? "products/search" 
      : "products", 
    { params }
  );

  return data; 
}

const getProductsQueryOptions= (params: IProductQuery = {}) => {
  return queryOptions({
    queryKey: ["products", params],
    queryFn : () => getProducts(params),
  });
};

interface UseGetProductsOptions {
  queryConfig?: TQueryConfig<typeof getProductsQueryOptions>;
  queryParams?: IProductQuery;
};

const useGetProducts = ({ 
  queryConfig,
  queryParams, 
}: UseGetProductsOptions = {}) => {
  return useQuery({
    ...getProductsQueryOptions(queryParams),
    ...queryConfig,
  });
}

export {
  getProducts,
  getProductsQueryOptions,
  useGetProducts,
}
