import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { UseQueryResult } from "react-query";
import theme from "../theme";
import { TokenCellType, WalletData } from "../types/DashboardData.type";
import { getTokenLogo } from "../utils/Logo.util";
import { getWalletTotalValue } from "../utils/NetWorth.util";
import { formatFiatValue, roundToDecimalStr } from "../utils/Number.util";
import CustomPaper from "./commons/CustomPaper";
import CustomTable from "./commons/CustomTable";
import FetchLoadingIndicator from "./commons/FetchLoadingIndicator";
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

  const { isLoading, isFetching, data: walletData, isIdle } = walletQuery;

  if (isLoading || isIdle) {
    return <LoadingTableSkeleton />;
  }

  const tokens = walletData ? walletData.data : [];

  const walletValue = getWalletTotalValue(tokens);

  const walletDataRows: ReactNode[][] = [];
  const expandedRows: ReactNode[] = [];

  tokens.forEach((tokenData: TokenCellType, i: number) => {
    const { ticker, balance, price, fiatValue, image, chains } = tokenData;

    if (chains) {
      expandedRows.push(
        <div key={`expanded-row-${i}`}>
          <ChainHeader>Chain Distribution</ChainHeader>
          {Object.entries(chains).map(([chainId, balance]) => {
            return (
              <ChainInfo key={`${ticker}-chain-${chainId}`}>
                <ChainId>Chain {chainId}: </ChainId>
                <div>{`${roundToDecimalStr(balance, 2)} ${ticker}`}</div>
              </ChainInfo>
            );
          })}
        </div>,
      );
    } else {
      expandedRows.push(null);
    }

    walletDataRows.push([
      <TickerContainer key={`ticker-${i}`}>
        {getTokenLogo(image)}
        {`${roundToDecimalStr(balance, 2)} ${ticker}`}
      </TickerContainer>,
      <div key={`price-${i}`}>{formatFiatValue(price, 4)}</div>,
      <div key={`fiat-${i}`}>{formatFiatValue(fiatValue)}</div>,
    ]);
  });

  return (
    <CardWrapper>
      <Container>
        <WalletHeaderContainer>
          <PngLogo src="/assets/wallet.png" size={1.75} />
          <WalletHeader>Wallet</WalletHeader>
          {isFetching && <FetchLoadingIndicator />}
        </WalletHeaderContainer>
        <WalletTotalValue>{formatFiatValue(walletValue)}</WalletTotalValue>
      </Container>
      <CustomTable tableKey="Wallet" headers={HEADERS} rows={walletDataRows} expandedRows={expandedRows} />
    </CardWrapper>
  );
};

const ChainHeader = styled.div`
  margin-bottom: 0.5rem;
  padding: 4px 8px;
  background-color: rgba(23, 0, 23, 0.8);
  border-radius: 4px;
  width: fit-content;
  font-weight: 500;
`;

const ChainId = styled.div`
  margin-left: 8px;
  flex-basis: 4rem;
`;

const ChainInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

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
