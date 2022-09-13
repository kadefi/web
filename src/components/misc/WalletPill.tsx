import styled from "@emotion/styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Tooltip } from "@mui/material";
import { useRef, useState } from "react";
import { shortenWalletAddress } from "../../utils/String.util";

type Props = {
  walletAddress: string;
  isPillShape?: boolean;
  isRemovable?: boolean;
  isShortened?: boolean;
  isFullWidth?: boolean;
  isCopiable?: boolean;
  onRemove?: (walletAddress: string) => void;
};

const WalletPill = (props: Props) => {
  const {
    walletAddress,
    isPillShape = false,
    isRemovable = false,
    isShortened = true,
    isFullWidth = false,
    isCopiable = false,
    onRemove,
  } = props;

  const DEFAULT_TOOLTIP = `Click to copy: ${walletAddress}`;

  const [tooltipText, setTooltipText] = useState(DEFAULT_TOOLTIP);
  const tooltipRef = useRef<NodeJS.Timeout>();

  const handleCopyWallet = () => {
    if (!isCopiable) {
      return;
    }

    if (tooltipRef.current) {
      clearTimeout(tooltipRef.current);
    }

    navigator.clipboard.writeText(walletAddress);
    setTooltipText("Copied");

    tooltipRef.current = setTimeout(() => {
      setTooltipText(DEFAULT_TOOLTIP);
    }, 1000);
  };

  const shortenedWallet = isShortened ? shortenWalletAddress(walletAddress) : walletAddress;

  const handleRemove = () => {
    onRemove && onRemove(walletAddress);
  };

  if (isPillShape) {
    const pill = (
      <WalletAddressPill isFullWidth={isFullWidth} isCopiable={isCopiable} onClick={handleCopyWallet}>
        <AddressContainer isRemovable={isRemovable}>{shortenedWallet}</AddressContainer>
        {isRemovable && (
          <RemoveIcon onClick={handleRemove}>
            <CloseRoundedIcon />
          </RemoveIcon>
        )}
      </WalletAddressPill>
    );

    return isShortened ? (
      <Tooltip title={tooltipText} placement="bottom" arrow>
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
  isCopiable: boolean;
};

const WalletAddressPill = styled.div<WalletAddressPillProps>`
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: #ff008058;
  font-weight: 500;
  font-size: 0.875rem;
  width: ${(props) => (props.isFullWidth ? "100%" : "fit-content")};
  cursor: ${(props) => (props.isCopiable ? "pointer" : "auto")};
  justify-content: space-between;
`;

const WalletAddress = styled.div`
  font-weight: 700;
  text-shadow: 0px 0px 10px #ff007f;
`;

export default WalletPill;
