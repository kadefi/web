import styled from "@emotion/styled";
import { shortenWalletAddress } from "../../utils/String.util";

type Props = {
  walletAddress: string;
};
const WalletPill = (props: Props) => {
  const { walletAddress } = props;

  return <WalletAddress>{shortenWalletAddress(walletAddress)}</WalletAddress>;
};

const WalletAddress = styled.div`
  font-size: 16px;
  font-weight: 700;
  text-shadow: 0px 0px 10px #ff007f;
`;

export default WalletPill;
