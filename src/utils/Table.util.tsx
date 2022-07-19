import { toDate, format } from "date-fns";
import TokenDisplay from "../components/commons/TokenDisplay";
import TokenPoolDisplay from "../components/commons/TokenPoolDisplay";
import { CELL_TYPE, TableRowData } from "../types/DashboardData.type";
import { formatFiatValue, roundToDecimalStr } from "./Number.util";

export const getRowDisplay = (rowData: TableRowData) => {
  return rowData.map((rowCell) => {
    if (rowCell.type === CELL_TYPE.POOL) {
      return <TokenPoolDisplay token0={rowCell.token0} token1={rowCell.token1} fiatValue={rowCell.fiatValue} />;
    }

    if (rowCell.type === CELL_TYPE.TOKEN) {
      return <TokenDisplay balance={rowCell.balance} ticker={rowCell.ticker} fiatValue={rowCell.fiatValue} />;
    }

    if (rowCell.type === CELL_TYPE.NUMBER) {
      return <div>{roundToDecimalStr(rowCell.value, 2)}</div>;
    }

    if (rowCell.type === CELL_TYPE.STRING) {
      return <div>{rowCell.value}</div>;
    }

    if (rowCell.type === CELL_TYPE.FIAT) {
      return <div>{formatFiatValue(rowCell.value)}</div>;
    }

    if (rowCell.type === CELL_TYPE.DATE) {
      const date = toDate(Date.parse(rowCell.value));
      return <div>{format(date, "MMM dd yyyy, HH:mm")}</div>;
    }

    return null;
  });
};
