import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo } from "react";
import { useGetWalletData } from "../../../api/queries/Dashboard.queries";
import FetchLoadingIndicator from "../../../commons/FetchLoadingIndicator";
import LoadingTableSkeleton from "../../../commons/LoadingTableSkeleton";
import Paper from "../../../commons/Paper";
import PngLogo from "../../../commons/PngLogo";
import TypographyNeon from "../../../commons/TypographyNeon";
import { usePageLayoutContext } from "../../../contexts/PageLayoutContext";
import theme from "../../../theme";
import { formatFiatValue } from "../../../utils/Number.util";
import { getFiatValuesMap } from "../../../utils/QueriesUtil";
import { sortComponentsByValueMap } from "../../../utils/Sort.util";
import EmptyWallet from "./EmptyWallet";
import WalletDataTable from "./WalletDataTable";

type Props = {
  handleNetWorthUpdate: (module: string, netWorth: number) => void;
};

const WalletCard = (props: Props) => {
  const { handleNetWorthUpdate } = props;

  const { walletAddresses } = usePageLayoutContext();
  const { walletsData, isLoading, isFetching } = useGetWalletData(walletAddresses, true);
  const isDataAvailable = useMemo(() => !isLoading && walletsData.length > 0, [isLoading, walletsData.length]);
  const isMultiWallet = useMemo(() => (walletAddresses ? walletAddresses.length > 1 : false), [walletAddresses]);
  const { addresses, valuesMap } = useMemo(() => getFiatValuesMap(walletsData), [walletsData]);

  const totalWalletValue = useMemo(
    () => walletsData.reduce((acc, current) => acc + current.fiatValue || 0, 0),
    [walletsData],
  );

  useEffect(() => {
    !isFetching && handleNetWorthUpdate("wallet", totalWalletValue);
  }, [handleNetWorthUpdate, isFetching, totalWalletValue]);

  const walletSections = useMemo(() => {
    const sections = walletsData.map((walletData) => (
      <WalletDataTable key={`wallet-${walletData.address}`} walletData={walletData} isMultiWallet={isMultiWallet} />
    ));

    sortComponentsByValueMap(sections, addresses, valuesMap);

    return sections;
  }, [addresses, isMultiWallet, valuesMap, walletsData]);

  if (isLoading) {
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
        {totalWalletValue && <WalletTotalValue>{formatFiatValue(totalWalletValue)}</WalletTotalValue>}
      </Container>
      <WalletsContainer>
        {walletSections}
        {!isDataAvailable && <EmptyWallet />}
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
