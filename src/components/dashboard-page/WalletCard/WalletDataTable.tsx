import styled from "@emotion/styled";
import { ReactNode } from "react";
import CustomTable from "../../../commons/Table/CustomTable";
import theme from "../../../theme";
import { TokenCellType, WalletData } from "../../../types/DashboardData.type";
import { getTokenLogo } from "../../../utils/Logo.util";
import { roundToDecimalStr, formatFiatValue } from "../../../utils/Number.util";
import WalletSectionWrapper from "../WalletSectionWrapper";
import TokenChainDistribution from "./TokenChainDistribution";

const HEADERS = ["Token Balance", "Price", "Value"];

type Props = {
  walletData: WalletData;
  isMultiWallet: boolean;
};

const WalletDataTable = (props: Props) => {
  const { walletData, isMultiWallet } = props;

  const { address, data: tokens, fiatValue } = walletData;

  const walletDataRows: ReactNode[][] = [];
  const expandedRows: ReactNode[] = [];

  tokens.forEach((tokenData: TokenCellType, i: number) => {
    const { ticker, balance, price, fiatValue, image, chains, source } = tokenData;

    if (chains) {
      expandedRows.push(
        <div key={`expanded-row-${i}`}>
          <InfoSection>
            <InfoHeader>Chain Distribution</InfoHeader>
            <TokenChainDistribution chains={chains} ticker={ticker} price={price} />
          </InfoSection>
          <InfoSection>
            <InfoHeader>Price Source</InfoHeader>
            <InfoContent>{`${source.type}: ${source.address}`}</InfoContent>
          </InfoSection>
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
    <Container>
      <WalletSectionWrapper walletAddress={address} fiatValue={fiatValue} isMultiWallet={isMultiWallet}>
        <CustomTable
          tableKey="Wallet"
          headers={HEADERS}
          rows={walletDataRows}
          expandedRows={expandedRows}
          isWalletTable
        />
      </WalletSectionWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoSection = styled.div``;

const InfoContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  margin-left: 1rem;
  font-size: 0.75rem;

  ${theme.breakpoints.down("sm")} {
    font-size: 0.7rem;
  }
`;

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

const TickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default WalletDataTable;
