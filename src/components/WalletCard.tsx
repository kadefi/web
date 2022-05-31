import { Box, Typography } from "@mui/material";
import CustomTable from "./commons/CustomTable";
import CustomPaper from "./commons/CustomPaper";
import TypographyNeon from "./commons/TypographyNeon";
import { styled } from "@mui/material/styles";
import { NetWorthMap, TokenCellType } from "../types/DashboardData.type";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { formatFiatValue, roundToDecimal } from "../utils/Number.util";
import { useGetWalletTokens } from "../api/Wallet.api";
import LoadingTableSkeleton from "./LoadingTableSkeleton";

const HEADERS = ["TOKEN", "BALANCE", "PRICE", "VALUE"];

type Props = {
  walletAddress: string;
  setNetWorthMap: Dispatch<SetStateAction<NetWorthMap>>;
};

const WalletCard = (props: Props) => {
  const { walletAddress, setNetWorthMap } = props;

  const { data: walletData, isLoading } = useGetWalletTokens(walletAddress);
  const [walletValue, setWalletValue] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && walletData) {
      const total = walletData.reduce(
        (prev, current) => prev + current.fiatValue,
        0
      );
      setNetWorthMap((netWorthMap) => ({ ...netWorthMap, wallet: total }));
      setWalletValue(total);
    }
  }, [isLoading, walletData]);

  if (isLoading) {
    return <LoadingTableSkeleton />;
  }

  if (!walletData) {
    return null;
  }

  const walletDataRows = walletData.map((tokenData: TokenCellType) => {
    const { ticker, balance, price, fiatValue } = tokenData;

    return [
      <div>{ticker}</div>,
      <div>{roundToDecimal(balance, 4)}</div>,
      <div>{formatFiatValue(price)}</div>,
      <div>{formatFiatValue(fiatValue)}</div>,
    ];
  });

  return (
    <CardWrapper>
      <Container>
        <WalletHeader>Wallet</WalletHeader>
        {walletValue && (
          <WalletTotalValue>{formatFiatValue(walletValue)}</WalletTotalValue>
        )}
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
