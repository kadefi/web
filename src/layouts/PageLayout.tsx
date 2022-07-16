import styled from "@emotion/styled";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useState, MouseEvent } from "react";
import { KadefiLogo } from "../components/commons/KadefiLogo";
import PngLogo from "../components/commons/PngLogo";
import SearchWalletInput from "../components/SearchWalletInput";
import { PageLayoutContext } from "../contexts/PageLayoutContext";
import { useWalletAddress } from "../hooks/useWalletAddress";
import theme from "../theme";

type Props = {
  children: ReactNode;
};

enum MENU_TITLE {
  DASHBOARD = "Dashboard",
  NFT = "NFT Gallery",
  PROJECT_HISTORY = "Portfolio History",
  TOOLS = "Tools",
}

const MENU_CONFIG = {
  [MENU_TITLE.DASHBOARD]: {
    icon: <DashboardOutlinedIcon />,
    route: "/dashboard",
    isDisabled: false,
  },
  [MENU_TITLE.NFT]: {
    icon: <PhotoLibraryOutlinedIcon />,
    route: "/gallery",
    isDisabled: false,
  },
  [MENU_TITLE.PROJECT_HISTORY]: {
    icon: <TimelineOutlinedIcon />,
    route: "",
    isDisabled: true,
  },
  [MENU_TITLE.TOOLS]: {
    icon: <ConstructionOutlinedIcon />,
    route: "",
    isDisabled: true,
  },
};

const PageLayout = (props: Props) => {
  const { children } = props;

  // Routing
  const router = useRouter();

  // States
  const [isSideBarOpen, setIsSideBarOpen] = useState(false); // Default to close sidebar (only for mobile)
  const [isDashboardLoading, setIsDashboardLoading] = useState(true); // Default to loading true

  // Custom Hooks
  const { walletAddress } = useWalletAddress();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Effects
  useEffect(() => {
    setIsSideBarOpen(!isMobile);
  }, [isMobile]);

  // Handlers

  const handleSideBarToggle = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleSideBarClose = () => {
    if (isSideBarOpen && isMobile) {
      setIsSideBarOpen(false);
    }
  };

  const handleMenuClick = (e: MouseEvent<HTMLDivElement>, title: MENU_TITLE) => {
    e.stopPropagation();

    if (MENU_CONFIG[title].isDisabled) {
      return;
    }

    handleSideBarClose();

    router.push(`${MENU_CONFIG[title].route}/${walletAddress}`);
  };

  // Display components
  const activeMenu = Object.values(MENU_TITLE).filter((title) =>
    router.pathname.includes(MENU_CONFIG[title].route),
  )[0] as MENU_TITLE;

  const navBar = (
    <NavBar>
      <LeftNavBar>
        <KadefiLogo />
        {isMobile ? <HamburgerMenu onClick={handleSideBarToggle} fontSize="medium" sx={{ color: "#b3b3b3" }} /> : null}
      </LeftNavBar>
      <RightNavBar maxWidth="md" onClick={handleSideBarClose}>
        <SearchWalletInput initialWalletAddress={walletAddress} isLoading={isDashboardLoading} />
      </RightNavBar>
    </NavBar>
  );

  const sideBar = (
    <SideBar isOpen={isSideBarOpen} numMenuItems={Object.values(MENU_TITLE).length}>
      <MenuButtons>
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
      </MenuButtons>
      <SidebarFooter>
        <SocialIcons>
          <TwitterContainer target="__blank" href="https://twitter.com/kadefi_money/">
            <div>Talk to us on</div>
            <TwitterIcon fontSize="small" />
          </TwitterContainer>
        </SocialIcons>
        <FluxAttribution href="https://runonflux.io/" target="_blank" rel="noreferrer">
          {`Powered by `}
          <PngLogo src="/assets/tokens/FLUX.png" size={1.5} quality={50} />
          Flux
        </FluxAttribution>
        <CopyrightText>Copyright © 2022 Kadefi.money. All rights reserved.</CopyrightText>
      </SidebarFooter>
    </SideBar>
  );

  return (
    <PageLayoutContext.Provider value={{ walletAddress, isDashboardLoading, setIsDashboardLoading }}>
      <Wrapper>
        {navBar}
        <Content onClick={handleSideBarClose}>
          {sideBar}
          <ChildrenContainer>{children}</ChildrenContainer>
        </Content>
      </Wrapper>
    </PageLayoutContext.Provider>
  );
};

const CopyrightText = styled.p`
  font-size: 8px;
  margin-top: 0px;
  text-align: center;
  ${theme.breakpoints.down("md")} {
    text-align: left;
    padding-left: 1rem;
  }
`;

const TwitterContainer = styled.a`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  color: #a1a1a1;
  font-size: 0.875rem;
  gap: 8px;

  ${theme.breakpoints.down("md")} {
    justify-content: flex-start;
    padding-left: 1rem;
  }
`;

const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  color: #a1a1a1;
`;

const FluxAttribution = styled.a`
  width: 100%;
  display: flex;
  gap: 4px;
  justify-content: center;
  position: relative;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: none;
  border-top: 0.5px dotted #5b5b5b;
  padding-top: 1rem;

  ${theme.breakpoints.down("md")} {
    justify-content: flex-start;
    padding-left: 1rem;
  }
`;

const HamburgerMenu = styled(MenuSharpIcon)`
  cursor: pointer;
`;

const RightNavBar = styled(Container)`
  flex-grow: 1;
`;

const LeftNavBar = styled.div`
  padding-left: 1rem;
  min-width: 17rem;

  ${theme.breakpoints.down("md")} {
    min-width: 100vw;
    display: flex;
    padding: 0.25rem 1.5rem 1rem 1.5rem;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  ${theme.breakpoints.down("sm")} {
    padding: 0.25rem 1rem 1rem 1rem;
  }
`;

const NavBar = styled(Box)`
  position: relative;
  display: flex;
  align-items: "center";
  width: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem 0;

  ${theme.breakpoints.down("md")} {
    flex-direction: column;
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

const MenuButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${theme.breakpoints.down("md")} {
    gap: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow-y: auto;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

type SideBarProps = {
  isOpen?: boolean;
  numMenuItems: number;
};

const SideBar = styled.div<SideBarProps>`
  width: ${(props) => (props.isOpen ? "17rem" : "0px")};
  padding: 2rem ${(props) => (props.isOpen ? "1rem" : "0px")};
  padding-bottom: 1rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.246) 100%);
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${theme.breakpoints.down("md")} {
    transition: height 0.5s, padding 0.5s;
    position: absolute;
    background: #270024;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
    height: ${(props) => (props.isOpen ? `${props.numMenuItems * 4 + 6.5}rem` : "0px")};
    width: 100vw;
    padding: ${(props) => (props.isOpen ? "1rem" : "0px")} 1rem;
  }
`;

const ChildrenContainer = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

export default PageLayout;

export const getPageLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
