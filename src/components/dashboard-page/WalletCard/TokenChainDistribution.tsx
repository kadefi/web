import CustomTable from "../../../commons/Table/CustomTable";
import { ChainInfo } from "../../../types/DashboardData.type";
import { roundToDecimalStr } from "../../../utils/Number.util";

type Props = {
  chains: ChainInfo;
  ticker: string;
  price: number | null;
};

const TokenChainDistribution = (props: Props) => {
  const { chains, ticker, price } = props;

  const headers = ["Balance", "Chain", "Value"];
  const rows: string[][] = [];

  Object.entries(chains).map(([chainId, balance]) => {
    rows.push([
      `${roundToDecimalStr(balance, 2)} ${ticker}`,
      `Chain ${chainId}`,
      price ? `$${roundToDecimalStr(balance * price, 2)}` : "-",
    ]);
  });

  return <CustomTable tableKey={`chains-${ticker}-subtable`} headers={headers} rows={rows} isSubTable />;
};

export default TokenChainDistribution;
