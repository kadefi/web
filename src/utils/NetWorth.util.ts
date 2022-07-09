import { UseQueryResult } from "react-query";
import { ProjectData, ProjectResponse, TokenCellType, WalletData } from "../types/DashboardData.type";
import { roundToDecimal } from "./Number.util";

export const getWalletTotalValue = (data: TokenCellType[]) => {
  return data.reduce((prev, current) => prev + current.fiatValue, 0);
};

export const getNetWorth = (walletQuery: UseQueryResult<WalletData>, projectsQuery: UseQueryResult<ProjectData>[]) => {
  const { data: walletData } = walletQuery;

  let netWorth = 0;
  if (walletData) {
    netWorth += getWalletTotalValue(walletData.data);
  }

  projectsQuery.forEach((projectQuery) => {
    const { data: projectData } = projectQuery;

    if (!projectData) {
      return;
    }

    netWorth += (projectData as ProjectResponse).fiatValue;
  });

  return roundToDecimal(netWorth, 2);
};
