import styled from "@emotion/styled";
import { TOKEN_TICKER } from "../../types/Project.type";
import { getTokenLogo } from "../../utils/Logo.util";
import { formatFiatValue, roundToDecimalStr } from "../../utils/Number.util";

type Props = {
  balance: number;
  ticker: TOKEN_TICKER;
  fiatValue: number;
};

const TokenDisplay = (props: Props) => {
  const { balance, ticker, fiatValue } = props;

  return (
    <Container>
      {getTokenLogo(ticker)}
      <div>
        <div>
          {roundToDecimalStr(balance, 2)} {ticker}
        </div>
        <FiatValue>{formatFiatValue(fiatValue)}</FiatValue>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FiatValue = styled.div`
  font-size: 12px;
  color: #c0c0c0;
`;

export default TokenDisplay;
