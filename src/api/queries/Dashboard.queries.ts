import { useQueries } from "react-query";
import { PROJECT_KEYS, WALLET_KEY } from "../../constants/Project.constant";
import { ProjectData, WalletData } from "../../types/DashboardData.type";
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

  PROJECT_KEYS.forEach((projectKey) => {
    queries.push({
      queryKey: [projectKey, walletAddress],
      queryFn: () => getProjectData(projectKey, walletAddress),
    });
  });

  return useQueries(queries);
};
