import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import type { TQueryConfig } from "@/libs/react-query";

import type { IAuthUser } from "../auth";

const getMe = async (): Promise<IAuthUser> => {
  const { data } = await api.get<IAuthUser>(`/auth/me`);
  return data;
};

const getMeQueryOptions = (pathname?: string) => {
  return queryOptions({
    queryKey: ["me", pathname],
    queryFn: () => getMe(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

interface UseMeOptions {
  pathname?: string;
  queryConfig?: TQueryConfig<typeof getMeQueryOptions>;
}

const useMe = ({ pathname, queryConfig }: UseMeOptions = {}) => {
  return useQuery({
    ...getMeQueryOptions(pathname),
    ...queryConfig,
  });
};

export { useMe, getMe, getMeQueryOptions };
