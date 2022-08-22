import styled from "@emotion/styled";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Container, useMediaQuery } from "@mui/material";
import { usePageLayoutContext } from "../../../contexts/PageLayoutContext";
import { useActiveMenu } from "../../../hooks/useActiveMenu";
import theme from "../../../theme";
import WalletPill from "../../misc/WalletPill";
import { MENU_CONFIG } from "./Menu.config";

const MultiWalletPills = () => {
  const activeMenu = useActiveMenu();
  const { walletAddresses } = usePageLayoutContext();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isRemovable = walletAddresses ? walletAddresses.length > 1 : false;

  return (
    <Wrapper maxWidth="md">
      {MENU_CONFIG[activeMenu].isWalletSearch && (
        <WalletPillsContainer>
          {walletAddresses?.map((walletAddress) => (
            <WalletPill
              key={`wallet-selector-${walletAddress}`}
              walletAddress={walletAddress}
              isPillShape
              isRemovable={isRemovable}
            />
          ))}
          <AddNewWalletButton>
            <AddRoundedIcon />
            {!isMobile && <span>Add Wallet</span>}
          </AddNewWalletButton>
        </WalletPillsContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  margin-top: 1.5rem;
`;

const AddNewWalletButton = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px 4px 8px;
  border-radius: 32px;
  background-color: #ff007f8c;
  margin-left: 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;

  ${theme.breakpoints.down("sm")} {
    padding: 4px;
    margin-left: 8px;
  }
`;

const WalletPillsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export default MultiWalletPills;
