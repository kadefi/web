import { CELL_TYPE, TableRowData, TokenCellType } from "../types/DashboardData.type";
import { formatFiatValue, roundToDecimal } from "./Number.util";
import toDate from "date-fns/toDate";

export const getRowDisplay = (rowData: TableRowData) => {
  return rowData.map((rowCell) => {
    if (rowCell.type === CELL_TYPE.POOL) {
      const { token0, token1, fiatValue } = rowCell;

      const tokenDisplay = (token: TokenCellType) => {
        return `${roundToDecimal(token.balance, 2)} ${token.ticker}`;
      };

      return (
        <div>
          <div>
            {tokenDisplay(token0)} + {tokenDisplay(token1)}
          </div>
          <div>{formatFiatValue(fiatValue)}</div>
        </div>
      );
    }

    if (rowCell.type === CELL_TYPE.TOKEN) {
      const { balance, ticker, fiatValue } = rowCell;
      return (
        <div>
          <div>
            {roundToDecimal(balance, 2)} {ticker}
          </div>
          <div>{formatFiatValue(fiatValue)}</div>
        </div>
      );
    }

    if (rowCell.type === CELL_TYPE.NUMBER) {
      return <div>{roundToDecimal(rowCell.value, 2)}</div>;
    }

    if (rowCell.type === CELL_TYPE.STRING) {
      return <div>{rowCell.value}</div>;
    }

    if (rowCell.type === CELL_TYPE.FIAT) {
      return <div>{formatFiatValue(rowCell.value)}</div>;
    }

    if (rowCell.type === CELL_TYPE.DATE) {
      const date = toDate(Date.parse(rowCell.value));
      return (
        <div>
          {date.toDateString()} {date.toLocaleTimeString()}
        </div>
      );
    }

    return null;
  });
};
