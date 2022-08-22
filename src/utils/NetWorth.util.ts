import { TokenCellType } from "../types/DashboardData.type";

export const getWalletTotalValue = (data: TokenCellType[]) => {
  return data.reduce((prev, current) => (current.fiatValue ? prev + current.fiatValue : prev), 0);
};
