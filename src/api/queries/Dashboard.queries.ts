import { QueryFunction, useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProjectData, ProjectsList, WalletData } from "../../types/DashboardData.type";
import { getQueriesResults, isQueriesFetching, isQueriesLoading } from "../../utils/QueriesUtil";
import { getProjectData, getProjectsList } from "../Project.api";
import { getWalletTokens } from "../Wallet.api";

export const useGetWalletData = (walletAddresseses: string[] | undefined, isEnabled: boolean) => {
  const queriesConfig: {
    queryKey: string[];
    queryFn: QueryFunction<WalletData>;
    enabled: boolean;
  }[] = walletAddresseses
    ? walletAddresseses.map((walletAddress) => ({
        queryKey: ["WALLET-QUERY", walletAddress],
        queryFn: ({ signal }) => getWalletTokens(walletAddress, signal),
        enabled: isEnabled,
      }))
    : [];

  const queries = useQueries({ queries: queriesConfig });

  return {
    walletsData: getQueriesResults(queries),
    isLoading: isQueriesLoading(queries),
    isFetching: isQueriesFetching(queries),
  };
};

export const useGetProjectsList = (): UseQueryResult<ProjectsList> => {
  return useQuery(["PROJECTS_LIST"], () => getProjectsList());
};

export const useGetProjectData = (projectModule: string, walletAddresses: string[] | undefined, isEnabled: boolean) => {
  const queriesConfig: {
    queryKey: string[];
    queryFn: QueryFunction<ProjectData>;
    enabled: boolean;
  }[] = walletAddresses
    ? walletAddresses.map((walletAddress) => ({
        queryKey: [`PROJECT-QUERY-${projectModule}`, walletAddress],
        queryFn: ({ signal }) => getProjectData(projectModule, signal, walletAddress),
        enabled: isEnabled,
      }))
    : [];

  const queries = useQueries({ queries: queriesConfig });

  return {
    projectsData: getQueriesResults(queries),
    isLoading: isQueriesLoading(queries),
    isFetching: isQueriesFetching(queries),
  };
};
