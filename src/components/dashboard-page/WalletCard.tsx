import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import FetchLoadingIndicator from "../../commons/FetchLoadingIndicator";
import LoadingTableSkeleton from "../../commons/LoadingTableSkeleton";
import Paper from "../../commons/Paper";
import PngLogo from "../../commons/PngLogo";
import CustomTable from "../../commons/Table/CustomTable";
import TypographyNeon from "../../commons/TypographyNeon";
import theme from "../../theme";
import { ChainInfo, TokenCellType, WalletData } from "../../types/DashboardData.type";
import { getTokenLogo } from "../../utils/Logo.util";
import { getWalletTotalValue } from "../../utils/NetWorth.util";
import { formatFiatValue, roundToDecimalStr } from "../../utils/Number.util";

const HEADERS = ["Token Balance", "Price", "Value"];

const getChainsTable = (chains: ChainInfo, ticker: string, price: number | null) => {
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

type Props = {
  walletQuery: UseQueryResult<WalletData>;
};

const WalletCard = (props: Props) => {
  const { walletQuery } = props;

  if (!walletQuery) {
    return null;
  }

  const { isLoading, isFetching, data: walletData } = walletQuery;

  if (isLoading) {
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
          <InfoSection>
            <InfoHeader>Chain Distribution</InfoHeader>
            {getChainsTable(chains, ticker, price)}
          </InfoSection>
          {/* <InfoSection>
            <InfoHeader>Price Source</InfoHeader>
            <InfoContent>{`${source.type}: ${source.address}`}</InfoContent>
          </InfoSection> */}
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
      <div key={`price-${i}`}>{price ? formatFiatValue(price, 4) : "-"}</div>,
      <div key={`fiat-${i}`}>{fiatValue ? formatFiatValue(fiatValue) : "-"}</div>,
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
      <CustomTable
        tableKey="Wallet"
        headers={HEADERS}
        rows={walletDataRows}
        expandedRows={expandedRows}
        isWalletTable
      />
    </CardWrapper>
  );
};

const InfoSection = styled.div``;

const InfoHeader = styled.div`
  margin-bottom: 0.25rem;
  border-radius: 4px;
  width: fit-content;
  font-weight: 500;
  color: pink;
  font-size: 0.65rem;
  margin-left: 1rem;
  text-transform: uppercase;
`;

// const InfoContent = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 0.25rem;
//   margin-left: 1rem;
//   font-size: 0.75rem;

//   ${theme.breakpoints.down("sm")} {
//     font-size: 0.7rem;
//   }
// `;

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

const CardWrapper = styled(Paper)({
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
