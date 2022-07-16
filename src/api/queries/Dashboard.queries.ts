import { QueryFunction, useQueries, UseQueryResult } from "react-query";
import { WALLET_KEY } from "../../constants/Project.constant";
import { ProjectData, WalletData } from "../../types/DashboardData.type";
import { PROJECT_KEY } from "../../types/Project.type";
import { getProjectData } from "../Project.api";
import { getWalletTokens } from "../Wallet.api";

export const useGetDashboardData = (walletAddress?: string) => {
  const queries: {
    queryKey: string[];
    queryFn: QueryFunction<WalletData | ProjectData>;
  }[] = [];

  if (walletAddress) {
    queries.push({
      queryKey: [WALLET_KEY, walletAddress],
      queryFn: ({ signal }) => getWalletTokens(walletAddress, signal),
    });

    Object.values(PROJECT_KEY).forEach((projectKey) => {
      queries.push({
        queryKey: [projectKey, walletAddress],
        queryFn: ({ signal }) => getProjectData(projectKey, walletAddress, signal),
      });
    });
  }

  const [walletQuery, ...projectsQuery] = useQueries(queries);

  return { walletQuery, projectsQuery } as {
    walletQuery: UseQueryResult<WalletData>;
    projectsQuery: UseQueryResult<ProjectData>[];
  };
};
