import { Box, Typography } from "@mui/material";
import CustomTable from "./commons/CustomTable";
import CustomPaper from "./commons/CustomPaper";
import TypographyNeon from "./commons/TypographyNeon";
import { styled } from "@mui/material/styles";
import { TokenCellType, WalletData } from "../types/DashboardData.type";
import { formatFiatValue, roundToDecimal } from "../utils/Number.util";
import LoadingTableSkeleton from "./LoadingTableSkeleton";
import { UseQueryResult } from "react-query";
import { getWalletTotalValue } from "../utils/NetWorth.util";

const HEADERS = ["TOKEN", "BALANCE", "PRICE", "VALUE"];

type Props = {
  walletQuery: UseQueryResult<WalletData>;
};

const WalletCard = (props: Props) => {
  const { walletQuery } = props;

  if (!walletQuery) return null;

  const { isLoading, data: walletData } = walletQuery;
  if (isLoading) return <LoadingTableSkeleton />;

  if (!walletData) return null;
  const { data: tokens } = walletData;

  if (tokens.length === 0) return null;
  const walletValue = getWalletTotalValue(tokens);

  const walletDataRows = tokens.map((tokenData: TokenCellType, i: number) => {
    const { ticker, balance, price, fiatValue } = tokenData;
    return [
      <div key={`ticker-${i}`}>{ticker}</div>,
      <div key={`balance-${i}`}>{roundToDecimal(balance, 4)}</div>,
      <div key={`price-${i}`}>{formatFiatValue(price)}</div>,
      <div key={`fiat-${i}`}>{formatFiatValue(fiatValue)}</div>,
    ];
  });

  return (
    <CardWrapper>
      <Container>
        <WalletHeader>Wallet</WalletHeader>
        {walletValue && <WalletTotalValue>{formatFiatValue(walletValue)}</WalletTotalValue>}
      </Container>
      <CustomTable tableKey="Wallet" headers={HEADERS} rows={walletDataRows} />
    </CardWrapper>
  );
};

const WalletHeader = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
});

const WalletTotalValue = styled(TypographyNeon)({
  fontSize: "1.25rem",
});

const CardWrapper = styled(CustomPaper)({
  paddingBottom: "1rem",
  marginBottom: "2rem",
});

const Container = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
});

export default WalletCard;
