import { useQueries } from "react-query";
import { WALLET_KEY } from "../../constants/Project.constant";
import { ProjectData, WalletData } from "../../types/DashboardData.type";
import { PROJECT_KEY } from "../../types/Project.type";
import { getProjectData } from "../Project.api";
import { getWalletTokens } from "../Wallet.api";

export const useGetDashboardData = (walletAddress: string) => {
  const queries: {
    queryKey: string[];
    queryFn: () => Promise<WalletData | ProjectData>;
  }[] = [
    {
      queryKey: [WALLET_KEY, walletAddress],
      queryFn: () => getWalletTokens(walletAddress),
    },
  ];

  Object.values(PROJECT_KEY).forEach((projectKey) => {
    queries.push({
      queryKey: [projectKey, walletAddress],
      queryFn: () => getProjectData(projectKey, walletAddress),
    });
  });

  return useQueries(queries);
};
