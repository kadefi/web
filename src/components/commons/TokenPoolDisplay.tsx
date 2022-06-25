import styled from "@emotion/styled";
import { TokenCellType } from "../../types/DashboardData.type";
import { getTokenLogo } from "../../utils/Logo.util";
import { roundToDecimal, formatFiatValue } from "../../utils/Number.util";

type Props = {
  token0: TokenCellType;
  token1: TokenCellType;
  fiatValue: number;
};

const TokenPoolDisplay = (props: Props) => {
  const { token0, token1, fiatValue } = props;

  const tokenDisplay = (token: TokenCellType) => {
    return `${roundToDecimal(token.balance, 2)} ${token.ticker}`;
  };

  return (
    <Container>
      <LogosContainer>
        {getTokenLogo(token0.ticker)}
        <SecondLogo>{getTokenLogo(token1.ticker)}</SecondLogo>
      </LogosContainer>
      <div>
        <div>
          {tokenDisplay(token0)} + {tokenDisplay(token1)}
        </div>
        <FiatValue>{formatFiatValue(fiatValue)}</FiatValue>
      </div>
    </Container>
  );
};

const LogosContainer = styled.div`
  display: flex;
`;

const SecondLogo = styled.div`
  position: relative;
  left: -5px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FiatValue = styled.div`
  font-size: 12px;
  color: #c0c0c0;
`;

export default TokenPoolDisplay;
