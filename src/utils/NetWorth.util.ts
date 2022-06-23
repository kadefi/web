import { UseQueryResult } from "react-query";
import { ProjectData, WalletData } from "../types/DashboardData.type";

export const getWalletTotalValue = (data: WalletData) => {
  return data.reduce((prev, current) => prev + current.fiatValue, 0);
};

export const getNetWorth = (walletQuery: UseQueryResult<WalletData>, projectsQuery: UseQueryResult<ProjectData>[]) => {
  const { data: walletData } = walletQuery;

  let netWorth = 0;
  if (walletData) netWorth += getWalletTotalValue(walletData);

  projectsQuery.map((projectQuery) => {
    const { data: projectData } = projectQuery;

    if (projectData) netWorth += projectData.fiatValue;
  });

  return netWorth;
};
