import { QueryFunction, useQueries, useQuery, UseQueryResult } from "react-query";
import { ProjectData, ProjectsList, WalletData } from "../../types/DashboardData.type";
import { getProjectData, getProjectsList } from "../Project.api";
import { getWalletTokens } from "../Wallet.api";

const WALLET_KEY = "WALLET_KEY";
const PROJECT_KEY = "PROJECT_KEY";

export const useGetDashboardData = (selectedProjectModules: string[] = [], walletAddress: string = "") => {
  const queries: {
    queryKey: string[];
    queryFn: QueryFunction<WalletData | ProjectData>;
    enabled: boolean;
  }[] = [];

  const isEnabled = selectedProjectModules?.length > 0 && walletAddress?.length > 0;

  queries.push({
    queryKey: [WALLET_KEY, walletAddress],
    queryFn: ({ signal }) => getWalletTokens(walletAddress, signal),
    enabled: isEnabled,
  });

  selectedProjectModules.forEach((projectModule) => {
    queries.push({
      queryKey: [PROJECT_KEY, projectModule, walletAddress],
      queryFn: ({ signal }) => getProjectData(projectModule, walletAddress, signal),
      enabled: isEnabled,
    });
  });

  const [walletQuery, ...projectsQuery] = useQueries(queries);

  return { walletQuery, projectsQuery } as {
    walletQuery: UseQueryResult<WalletData>;
    projectsQuery: UseQueryResult<ProjectData>[];
  };
};

export const useGetProjectsList = (): UseQueryResult<ProjectsList> => {
  return useQuery(["PROJECTS_LIST"], () => getProjectsList());
};
