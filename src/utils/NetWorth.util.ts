import { UseQueryResult } from "react-query";
import { ProjectData, ProjectResponse, TokenCellType, WalletData } from "../types/DashboardData.type";

export const getWalletTotalValue = (data: TokenCellType[]) => {
  return data.reduce((prev, current) => prev + current.fiatValue, 0);
};

export const getNetWorth = (walletQuery: UseQueryResult<WalletData>, projectsQuery: UseQueryResult<ProjectData>[]) => {
  const { data: walletData } = walletQuery;

  let netWorth = 0;
  if (walletData) netWorth += getWalletTotalValue(walletData.data);

  projectsQuery.map((projectQuery) => {
    const { data: projectResponse } = projectQuery;
    const projectData = projectResponse as ProjectResponse;
    if (projectData) netWorth += projectData.fiatValue;
  });

  return netWorth;
};
