import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useIsFetching } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useGetWalletData } from "../../../api/queries/Dashboard.queries";
import FetchLoadingIndicator from "../../../commons/FetchLoadingIndicator";
import LoadingTableSkeleton from "../../../commons/LoadingTableSkeleton";
import Paper from "../../../commons/Paper";
import PngLogo from "../../../commons/PngLogo";
import TypographyNeon from "../../../commons/TypographyNeon";
import { WALLET_KEY } from "../../../constants/QueriesKey.constant";
import { usePageLayoutContext } from "../../../contexts/PageLayoutContext";
import theme from "../../../theme";
import { formatFiatValue } from "../../../utils/Number.util";
import { getQueriesResults } from "../../../utils/QueriesUtil";
import WalletDataTable from "./WalletDataTable";

// const MOCK_WALLET_ADDRESSES = [
//   "k:ca237063d821a34f8004e52d93b36715d75566a85164c6268c4aa61ecf176a57",
//   "k:001ad386f24013dade4cc2ea9d1fd7ef27605591172e69ce4282a634584acfa9",
//   "k:456ff7642ec4f59f1685bd8bbe35f4b7ab7b2c688e16582a823e596370401258",
//   "k:609466382bc22b6c19f030acddaacba0d5f2aeb299dca4694d3bc104e34df654",
//   "k:991a3f4acc07275e732231031a3c7522b6e918c214b4a94d6ac485451e55593e",
// ];

type Props = {
  handleNetWorthUpdate: (module: string, netWorth: number) => void;
};

const WalletCard = (props: Props) => {
  const { handleNetWorthUpdate } = props;

  const { walletAddresses } = usePageLayoutContext();
  const [walletsNetWorth, setWalletsNetWorth] = useState<number | null>(null);
  const walletQueries = useGetWalletData(walletAddresses, true);
  const isFetching = Boolean(useIsFetching([WALLET_KEY]));
  const walletsData = getQueriesResults(walletQueries);
  const isDataAvailable = !isFetching && walletsData.length > 0;
  const isDataNotAvailable = walletsData.length === 0;
  const isMultiWallet = walletAddresses ? walletAddresses.length > 1 : false;

  useEffect(() => {
    if (isDataAvailable) {
      const totalValue = walletsData.reduce((acc, current) => acc + current.fiatValue || 0, 0);
      setWalletsNetWorth(totalValue);
    }
  }, [isDataAvailable, walletsData]);

  useEffect(() => {
    if (walletsNetWorth) {
      handleNetWorthUpdate("wallet", walletsNetWorth);
    }
  }, [handleNetWorthUpdate, walletsNetWorth]);

  if (isDataNotAvailable) {
    return <LoadingTableSkeleton />;
  }

  return (
    <CardWrapper>
      <Container>
        <WalletHeaderContainer>
          <PngLogo src="/assets/wallet.png" size={1.75} />
          <WalletHeader>Wallet</WalletHeader>
          {isFetching && <FetchLoadingIndicator />}
        </WalletHeaderContainer>
        {walletsNetWorth && <WalletTotalValue>{formatFiatValue(walletsNetWorth)}</WalletTotalValue>}
      </Container>
      <WalletsContainer>
        {walletsData.map((walletData) => (
          <WalletDataTable key={`wallet-${walletData.address}`} walletData={walletData} isMultiWallet={isMultiWallet} />
        ))}
      </WalletsContainer>
    </CardWrapper>
  );
};

const WalletsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  font-weight: 500;

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
