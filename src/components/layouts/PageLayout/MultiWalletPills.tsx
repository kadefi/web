import styled from "@emotion/styled";
import SettingsIcon from "@mui/icons-material/Settings";
import { Container, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { usePageLayoutContext } from "../../../contexts/PageLayoutContext";
import { useActiveMenu } from "../../../hooks/useActiveMenu";
import theme from "../../../theme";
import WalletPill from "../../misc/WalletPill";
import AddWalletModal from "./AddWalletModal";
import { MENU_CONFIG } from "./Menu.config";

const MultiWalletPills = () => {
  const activeMenu = useActiveMenu();
  const { walletAddresses } = usePageLayoutContext();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper maxWidth="md">
      {MENU_CONFIG[activeMenu].isWalletSearch && (
        <WalletPillsContainer>
          {walletAddresses?.map((walletAddress) => (
            <WalletPill key={`wallet-selector-${walletAddress}`} walletAddress={walletAddress} isPillShape />
          ))}
          <UpdateWalletsButton onClick={handleOpen}>
            <SettingsIcon />
            {!isMobile && <span>Configure</span>}
          </UpdateWalletsButton>
        </WalletPillsContainer>
      )}
      {walletAddresses && (
        <AddWalletModal walletAddresses={walletAddresses} isModalOpen={isModalOpen} handleClose={handleClose} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  margin-top: 1.5rem;
`;

const UpdateWalletsButton = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 16px 5px 8px;
  border-radius: 32px;
  background-color: rgb(0 0 0 / 50%);
  margin-left: 4px;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: 300ms;

  ${theme.breakpoints.down("sm")} {
    padding: 4px;
    margin-left: 8px;
  }

  &:hover {
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
  }
`;

const WalletPillsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export default MultiWalletPills;
