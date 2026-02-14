import { api } from "@/libs/api";
import { TQueryConfig } from "@/libs/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

import { IAuthUser } from "../auth";

const getMe = async (): Promise<IAuthUser> => {
  const { data }= await api.get<IAuthUser>(`/auth/me`);
  return data; 
}

const getMeQueryOptions = (pathname?: string) => {
  return queryOptions({
    queryKey: ["me", pathname],
    queryFn : () => getMe(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    gcTime: 10 * 60 * 1000, // 10 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

interface UseMeOptions {
  pathname?: string;
  queryConfig?: TQueryConfig<typeof getMeQueryOptions>;
};

const useMe = ({ 
  pathname,
  queryConfig,
}: UseMeOptions = {}) => {
  return useQuery({
    ...getMeQueryOptions(pathname),
    ...queryConfig,
  });
}

export {
  useMe,
  getMe,
  getMeQueryOptions,
}
