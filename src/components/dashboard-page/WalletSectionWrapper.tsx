import styled from "@emotion/styled";
import { ReactNode } from "react";
import { formatFiatValue } from "../../utils/Number.util";
import WalletPill from "../misc/WalletPill";

type Props = {
  children: ReactNode;
  walletAddress: string | undefined;
  fiatValue: number | null | undefined;
  isMultiWallet: boolean;
};

const WalletSectionWrapper = (props: Props) => {
  const { children, walletAddress, fiatValue, isMultiWallet } = props;

  const showWalletHeader = isMultiWallet && walletAddress && fiatValue;

  return (
    <Container>
      {showWalletHeader && (
        <WalletBalanceContainer>
          <WalletPill walletAddress={walletAddress} />
          {fiatValue && <WalletBalance>{formatFiatValue(fiatValue)}</WalletBalance>}
        </WalletBalanceContainer>
      )}
      <SectionContainer>{children}</SectionContainer>
    </Container>
  );
};

const Container = styled.div`
  background: #330a2f;
  margin: 0 16px;
  padding: 8px 0;
  border-radius: 8px;
`;

const SectionContainer = styled.div`
  margin: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WalletBalance = styled.div`
  text-shadow: 0px 0px 10px #ff007f;
  font-weight: 500;
`;

const WalletBalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 16px 8px 16px;
`;

export default WalletSectionWrapper;
