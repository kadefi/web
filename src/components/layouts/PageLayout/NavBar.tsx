import styled from "@emotion/styled";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import { Container, Box, useMediaQuery } from "@mui/material";
import { useActiveMenu } from "../../../hooks/useActiveMenu";
import useIsPageFetching from "../../../hooks/useIsPageFetching";
import theme from "../../../theme";
import { KadefiLogo } from "../../nav-bar/KadefiLogo";
import SearchWalletInput from "../../nav-bar/SearchWalletInput";
import { MENU_CONFIG } from "./Menu.config";

type Props = {
  handleSideBarToggle: () => void;
  handleSideBarClose: () => void;
};

const NavBar = (props: Props) => {
  const { handleSideBarToggle, handleSideBarClose } = props;

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isPageFetching = useIsPageFetching();
  const activeMenu = useActiveMenu();

  return (
    <NavBarContainer>
      <LeftNavBar>
        <KadefiLogo />
        {isMobile ? <HamburgerMenu onClick={handleSideBarToggle} fontSize="medium" sx={{ color: "#b3b3b3" }} /> : null}
      </LeftNavBar>
      {MENU_CONFIG[activeMenu].isWalletSearch && (
        <RightNavBar maxWidth="md" onClick={handleSideBarClose}>
          <SearchWalletInput isLoading={isPageFetching} />
        </RightNavBar>
      )}
    </NavBarContainer>
  );
};

const HamburgerMenu = styled(MenuSharpIcon)`
  cursor: pointer;
`;

const RightNavBar = styled(Container)`
  flex-grow: 1;
  display: flex;
  align-items: center;

  ${theme.breakpoints.down("md")} {
    padding-bottom: 1rem;
  }
`;

const LeftNavBar = styled.div`
  min-width: 17rem;
  padding: 1rem 0 1rem 1rem;

  ${theme.breakpoints.down("md")} {
    min-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 1rem;
  }
`;

const NavBarContainer = styled(Box)`
  position: relative;
  display: flex;
  align-items: "center";
  width: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);

  ${theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;

export default NavBar;
