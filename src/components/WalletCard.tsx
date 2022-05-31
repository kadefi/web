import { Box, Typography } from "@mui/material";
import CustomTable from "./commons/CustomTable";
import CustomPaper from "./commons/CustomPaper";
import TypographyNeon from "./commons/TypographyNeon";
import { styled } from "@mui/material/styles";
import { TokenCellType, WalletData } from "../types/DashboardData.type";
import { useMemo } from "react";
import { formatFiatValue, roundToDecimal } from "../utils/Number.util";

const HEADERS = ["TOKEN", "BALANCE", "PRICE", "VALUE"];

type Props = {
  walletData: WalletData;
};

const WalletCard = (props: Props) => {
  const { walletData } = props;

  const totalValue = useMemo(
    () => walletData.reduce((prev, current) => prev + current.fiatValue, 0),
    [walletData]
  );

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
        <WalletTotalValue>{formatFiatValue(totalValue)}</WalletTotalValue>
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
