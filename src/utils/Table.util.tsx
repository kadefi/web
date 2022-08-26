import { toDate, format } from "date-fns";
import TokenDisplay from "../components/dashboard-page/TokenDisplay";
import TokenPoolDisplay from "../components/dashboard-page/TokenPoolDisplay";
import { CellType } from "../enums/CellType.enum";
import { TableRowData } from "../types/DashboardData.type";
import { formatFiatValue, roundToDecimalStr } from "./Number.util";

export const getRowDisplay = (rowData: TableRowData) => {
  return rowData.map((rowCell) => {
    if (rowCell.type === CellType.Pool) {
      return <TokenPoolDisplay token0={rowCell.token0} token1={rowCell.token1} fiatValue={rowCell.fiatValue} />;
    }

    if (rowCell.type === CellType.Token) {
      return (
        <TokenDisplay
          balance={rowCell.balance}
          ticker={rowCell.ticker}
          fiatValue={rowCell.fiatValue}
          image={rowCell.image}
        />
      );
    }

    if (rowCell.type === CellType.Number) {
      return <div>{roundToDecimalStr(rowCell.value, 2)}</div>;
    }

    if (rowCell.type === CellType.String) {
      return <div>{rowCell.value}</div>;
    }

    if (rowCell.type === CellType.Fiat) {
      return <div>{formatFiatValue(rowCell.value)}</div>;
    }

    if (rowCell.type === CellType.Date) {
      const date = toDate(Date.parse(rowCell.value));
      return <div>{format(date, "MMM dd yyyy, HH:mm")}</div>;
    }

    return null;
  });
};
