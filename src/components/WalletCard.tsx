import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UseQueryResult } from "react-query";
import theme from "../theme";
import { TokenCellType, WalletData } from "../types/DashboardData.type";
import { getTokenLogo } from "../utils/Logo.util";
import { getWalletTotalValue } from "../utils/NetWorth.util";
import { formatFiatValue, roundToDecimalStr } from "../utils/Number.util";
import CustomPaper from "./commons/CustomPaper";
import CustomTable from "./commons/CustomTable";
import PngLogo from "./commons/PngLogo";
import TypographyNeon from "./commons/TypographyNeon";
import LoadingTableSkeleton from "./LoadingTableSkeleton";

const HEADERS = ["Token Balance", "Price", "Value"];

type Props = {
  walletQuery: UseQueryResult<WalletData>;
};

const WalletCard = (props: Props) => {
  const { walletQuery } = props;

  if (!walletQuery) {
    return null;
  }

  const { isLoading, data: walletData, isIdle } = walletQuery;

  if (isLoading || isIdle) {
    return <LoadingTableSkeleton />;
  }

  const tokens = walletData ? walletData.data : [];

  const walletValue = getWalletTotalValue(tokens);

  const walletDataRows = tokens.map((tokenData: TokenCellType, i: number) => {
    const { ticker, balance, price, fiatValue } = tokenData;
    return [
      <TickerContainer key={`ticker-${i}`}>
        {getTokenLogo(ticker)} {`${roundToDecimalStr(balance, 4)} ${ticker}`}
      </TickerContainer>,
      <div key={`price-${i}`}>{formatFiatValue(price, 6)}</div>,
      <div key={`fiat-${i}`}>{formatFiatValue(fiatValue)}</div>,
    ];
  });

  return (
    <CardWrapper>
      <Container>
        <WalletHeaderContainer>
          <PngLogo src="/assets/wallet.png" size={1.75} />
          <WalletHeader>Wallet</WalletHeader>
        </WalletHeaderContainer>
        <WalletTotalValue>{formatFiatValue(walletValue)}</WalletTotalValue>
      </Container>
      <CustomTable tableKey="Wallet" headers={HEADERS} rows={walletDataRows} />
    </CardWrapper>
  );
};

const TickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WalletHeaderContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const WalletHeader = styled(Typography)`
  font-size: 1.25rem;
  font-weight: bold;

  ${theme.breakpoints.down("sm")} {
    font-size: 1rem;
  }
`;

const WalletTotalValue = styled(TypographyNeon)`
  font-size: 1.25rem;

  ${theme.breakpoints.down("sm")} {
    font-size: 1rem;
  }
`;

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
