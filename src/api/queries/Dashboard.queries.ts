import { QueryFunction, useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { WALLET_KEY } from "../../constants/QueriesKey.constant";
import { ProjectData, ProjectsList, WalletData } from "../../types/DashboardData.type";
import { getProjectQueryKey } from "../../utils/QueriesUtil";
import { getProjectData, getProjectsList } from "../Project.api";
import { getWalletTokens } from "../Wallet.api";

export const useGetWalletData = (walletAddresseses: string[] | undefined, isEnabled: boolean) => {
  const queries: {
    queryKey: string[];
    queryFn: QueryFunction<WalletData>;
    enabled: boolean;
  }[] = walletAddresseses
    ? walletAddresseses.map((walletAddress) => ({
        queryKey: [WALLET_KEY, walletAddress],
        queryFn: ({ signal }) => getWalletTokens(walletAddress, signal),
        enabled: isEnabled,
      }))
    : [];

  return useQueries({ queries });
};

export const useGetProjectsList = (): UseQueryResult<ProjectsList> => {
  return useQuery(["PROJECTS_LIST"], () => getProjectsList());
};

export const useGetProjectData = (projectModule: string, walletAddresses: string[] | undefined, isEnabled: boolean) => {
  const queries: {
    queryKey: string[];
    queryFn: QueryFunction<ProjectData>;
    enabled: boolean;
  }[] = walletAddresses
    ? walletAddresses.map((walletAddress) => ({
        queryKey: [getProjectQueryKey(projectModule), walletAddress],
        queryFn: ({ signal }) => getProjectData(projectModule, signal, walletAddress),
        enabled: isEnabled,
      }))
    : [];

  return useQueries({ queries });
};
