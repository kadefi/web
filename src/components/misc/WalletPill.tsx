import styled from "@emotion/styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { shortenWalletAddress } from "../../utils/String.util";

type Props = {
  walletAddress: string;
  isPillShape?: boolean;
  isRemovable?: boolean;
};

const WalletPill = (props: Props) => {
  const { walletAddress, isPillShape = false, isRemovable = false } = props;

  const shortenedWallet = shortenWalletAddress(walletAddress);

  if (isPillShape) {
    return (
      <WalletAddressPill>
        <AddressContainer>{shortenedWallet}</AddressContainer>
        {isRemovable && (
          <RemoveIcon>
            <CloseRoundedIcon />
          </RemoveIcon>
        )}
      </WalletAddressPill>
    );
  }

  return <WalletAddress>{shortenedWallet}</WalletAddress>;
};

const AddressContainer = styled.div`
  margin: 6px 12px;
`;

const RemoveIcon = styled.div`
  display: flex;
  align-items: center;
  background: #ff007f8c;
  border-radius: 0 4px 4px 0;
  padding: 4.5px;
`;

const WalletAddressPill = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  background: rgb(0 0 0 / 50%);
  font-weight: 500;
  font-size: 0.875rem;
`;

const WalletAddress = styled.div`
  font-weight: 700;
  text-shadow: 0px 0px 10px #ff007f;
`;

export default WalletPill;
