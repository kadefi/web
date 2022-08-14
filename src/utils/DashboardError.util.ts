import { UseQueryResult } from "@tanstack/react-query";
import { ProjectData, WalletData } from "../types/DashboardData.type";

export const getDashboardErrors = (
  walletQuery: UseQueryResult<WalletData>,
  projectsQuery: UseQueryResult<ProjectData>[],
) => {
  const { data: walletData } = walletQuery;
  const projectErrors = projectsQuery
    .filter((projectQuery) => projectQuery.isError)
    .map((projectQuery) => {
      const { error } = projectQuery;
      // @ts-ignore
      return error.response.data;
    });

  const tokenErrors = walletData ? walletData.errors : null;
  return { tokenErrors, projectErrors };
};
