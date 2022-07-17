import { QueryFunction, useQueries, useQuery, UseQueryResult } from "react-query";
import { ProjectData, ProjectsList, WalletData } from "../../types/DashboardData.type";
import { getProjectData, getProjectsList } from "../Project.api";
import { getWalletTokens } from "../Wallet.api";

export const useGetDashboardData = (projectsList: ProjectsList = [], walletAddress: string = "") => {
  const queries: {
    queryKey: string[];
    queryFn: QueryFunction<WalletData | ProjectData>;
    enabled: boolean;
  }[] = [];

  const isEnabled = projectsList?.length > 0 && walletAddress?.length > 0;

  queries.push({
    queryKey: ["WALLET", walletAddress],
    queryFn: ({ signal }) => getWalletTokens(walletAddress, signal),
    enabled: isEnabled,
  });

  const modules = projectsList.map((project) => project.module);

  modules.forEach((projectKey) => {
    queries.push({
      queryKey: [projectKey, walletAddress],
      queryFn: ({ signal }) => getProjectData(projectKey, walletAddress, signal),
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
  return useQuery(["PROJECTS_LIST"], () => getProjectsList(), { cacheTime: 1000 * 60 * 10 });
};
