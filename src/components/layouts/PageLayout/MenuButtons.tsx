import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { usePageLayoutContext } from "../../../contexts/PageLayoutContext";
import { useCurrentMenu } from "../../../hooks/useCurrentMenu";
import theme from "../../../theme";
import { MenuConfigItem } from "../../../types/Menu.type";
import { MENU_CONFIG } from "./Menu.config";

type Props = {
  onClose: () => void;
};

const MenuButtons = (props: Props) => {
  const { onClose } = props;
  const router = useRouter();
  const { currentMenu } = useCurrentMenu();
  const { walletAddresses } = usePageLayoutContext();

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>, config: MenuConfigItem) => {
    e.stopPropagation();

    const { isDisabled, isWalletSearch, route } = config;

    if (isDisabled) {
      return;
    }

    if (isWalletSearch) {
      router.push({ pathname: route, query: { wallet: walletAddresses } });
    } else {
      router.push(`${route}`);
    }

    onClose();
  };

  return (
    <MenuButtonsContainer>
      {MENU_CONFIG.map((config) => {
        const { title, isDisabled, icon } = config;

        const menuButton = (
          <MenuButton
            key={title}
            isActive={title === currentMenu.title}
            isDisabled={isDisabled}
            onClick={(e) => handleMenuClick(e, config)}
          >
            {icon}
            {title}
          </MenuButton>
        );

        if (isDisabled) {
          return (
            <Tooltip key={`tooltip-${title}`} title="Under development" placement="right" arrow>
              {menuButton}
            </Tooltip>
          );
        }

        return menuButton;
      })}
    </MenuButtonsContainer>
  );
};

const MenuButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${theme.breakpoints.down("md")} {
    gap: 1rem;
  }
`;

type MenuButtonProps = {
  isActive?: boolean;
  isDisabled?: boolean;
};

const MenuButton = styled.div<MenuButtonProps>`
  font-weight: 500;
  padding: 0.5rem 1rem;
  width: 100%;
  background: ${(props) => (props.isActive ? "linear-gradient(101.68deg, #6502e2 -6%, #ff007f 100%)" : "none")};
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  transition-duration: 300ms;
  transition-property: background, background-color;
  display: flex;
  gap: 8px;
  align-items: center;
  white-space: nowrap;
  opacity: ${(props) => (props.isDisabled ? "0.3" : "1")};

  &:hover {
    background-color: ${(props) => (props.isDisabled ? "none" : "rgb(255, 255, 255, 0.1)")};
  }
`;

export default MenuButtons;
