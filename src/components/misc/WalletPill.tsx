import styled from "@emotion/styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Tooltip } from "@mui/material";
import { shortenWalletAddress } from "../../utils/String.util";

type Props = {
  walletAddress: string;
  isPillShape?: boolean;
  isRemovable?: boolean;
  isShortened?: boolean;
  isFullWidth?: boolean;
  onRemove?: (walletAddress: string) => void;
};

const WalletPill = (props: Props) => {
  const {
    walletAddress,
    isPillShape = false,
    isRemovable = false,
    isShortened = true,
    isFullWidth = false,
    onRemove,
  } = props;

  const shortenedWallet = isShortened ? shortenWalletAddress(walletAddress) : walletAddress;

  const handleRemove = () => {
    onRemove && onRemove(walletAddress);
  };

  if (isPillShape) {
    const pill = (
      <WalletAddressPill isFullWidth={isFullWidth}>
        <AddressContainer isRemovable={isRemovable}>{shortenedWallet}</AddressContainer>
        {isRemovable && (
          <RemoveIcon onClick={handleRemove}>
            <CloseRoundedIcon />
          </RemoveIcon>
        )}
      </WalletAddressPill>
    );

    return isShortened ? (
      <Tooltip title={walletAddress} placement="bottom" arrow>
        {pill}
      </Tooltip>
    ) : (
      pill
    );
  }

  return <WalletAddress>{shortenedWallet}</WalletAddress>;
};

type AddressContainerProps = {
  isRemovable: boolean;
};

const AddressContainer = styled.div<AddressContainerProps>`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  margin: 6px 12px;
  text-overflow: ellipsis;
  width: ${(props) => (props.isRemovable ? "calc(100% - 64px)" : "100%")};
`;

const RemoveIcon = styled.div`
  display: flex;
  align-items: center;
  background: rgb(0 0 0 / 80%);
  border-radius: 0 4px 4px 0;
  padding: 4.5px 8px;
  cursor: pointer;
`;

type WalletAddressPillProps = {
  isFullWidth: boolean;
};

const WalletAddressPill = styled.div<WalletAddressPillProps>`
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: #ff008058;
  font-weight: 500;
  font-size: 0.875rem;
  width: ${(props) => (props.isFullWidth ? "100%" : "fit-content")};
  justify-content: space-between;
`;

const WalletAddress = styled.div`
  font-weight: 700;
  text-shadow: 0px 0px 10px #ff007f;
`;

export default WalletPill;
