import round from "lodash/round";
import { UseQueryResult } from "@tanstack/react-query";
import { isEmpty } from "underscore";
import { ProjectData, ProjectResponse, TokenCellType, WalletData } from "../types/DashboardData.type";

export const getWalletTotalValue = (data: TokenCellType[]) => {
  return data.reduce((prev, current) => (current.fiatValue ? prev + current.fiatValue : prev), 0);
};

export const getNetWorth = (walletQuery: UseQueryResult<WalletData>, projectsQuery: UseQueryResult<ProjectData>[]) => {
  const { data: walletData } = walletQuery;
  let netWorth = 0;

  if (walletData && !isEmpty(walletData)) {
    netWorth += getWalletTotalValue(walletData.data);
  }

  projectsQuery.forEach((projectQuery) => {
    const { data: projectData } = projectQuery;

    if (!projectData || isEmpty(projectData)) {
      return;
    }

    netWorth += (projectData as ProjectResponse).fiatValue;
  });

  return round(netWorth, 2);
};
