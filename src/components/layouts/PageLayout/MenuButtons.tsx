import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";
import React from "react";
import { useActiveMenu } from "../../../hooks/useActiveMenu";
import theme from "../../../theme";
import { MENU_CONFIG, MENU_TITLE } from "./Menu.config";

type Props = {
  handleMenuClick: (e: React.MouseEvent<HTMLDivElement>, title: MENU_TITLE) => void;
};

const MenuButtons = (props: Props) => {
  const { handleMenuClick } = props;
  const activeMenu = useActiveMenu();

  return (
    <MenuButtonsContainer>
      {Object.values(MENU_TITLE).map((title) => {
        const menuButton = (
          <MenuButton
            key={title}
            isActive={title === activeMenu}
            isDisabled={MENU_CONFIG[title].isDisabled}
            onClick={(e) => handleMenuClick(e, title)}
          >
            {MENU_CONFIG[title].icon}
            {title}
          </MenuButton>
        );

        if (MENU_CONFIG[title].isDisabled) {
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
