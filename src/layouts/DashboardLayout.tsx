import styled from "@emotion/styled";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useState, MouseEvent } from "react";
import SearchWalletInput from "../components/SearchWalletInput";
import { DashboardLayoutContext } from "../contexts/DashboardLayoutContext";
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
    route: "/nft",
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

const DashboardLayout = (props: Props) => {
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
  const handleLogoClick = () => {
    router.push("/");
  };

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
        <ProjectLogo onClick={handleLogoClick}>
          <LogoContainer>
            <Image src="/assets/logo.png" layout="fill" objectFit="contain" alt="logo" priority />
          </LogoContainer>
          <div>
            <ProjectName>KADEFI</ProjectName>
            <ProjectName color="#FF007F">.MONEY</ProjectName>
          </div>
          <BetaTag>BETA</BetaTag>
        </ProjectLogo>
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
              <Tooltip title="Under development" placement="right" arrow>
                {menuButton}
              </Tooltip>
            );
          }

          return menuButton;
        })}
      </MenuButtons>
    </SideBar>
  );

  return (
    <DashboardLayoutContext.Provider value={{ isDashboardLoading, setIsDashboardLoading }}>
      <Wrapper>
        {navBar}
        <Content onClick={handleSideBarClose}>
          {sideBar}
          <ChildrenContainer>{children}</ChildrenContainer>
        </Content>
      </Wrapper>
    </DashboardLayoutContext.Provider>
  );
};

const BetaTag = styled.div`
  background-color: #ff007f;
  padding: 2px 8px;
  font-size: 0.6rem;
  font-weight: 700;
  border-radius: 8rem;
`;

const HamburgerMenu = styled(MenuSharpIcon)`
  cursor: pointer;
`;

const RightNavBar = styled(Container)`
  flex-grow: 1;
`;

const LeftNavBar = styled.div`
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

const ProjectLogo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding-left: 1rem;

  ${theme.breakpoints.down("md")} {
    height: 1.5rem;
    padding: 0;
    gap: 8px;
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

const ProjectName = styled(Typography)`
  display: inline;
  font-weight: 700;
  font-size: 18px;
`;

const LogoContainer = styled(Box)({
  position: "relative",
  height: "2.25rem",
  width: "2rem",
});

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
  opacity: ${(props) => (props.isDisabled ? "0.5" : "1")};

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
  height: 100vh;
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
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.246) 100%);
  overflow: hidden;
  z-index: 1;

  ${theme.breakpoints.down("md")} {
    transition: height 0.5s, padding 0.5s;
    position: absolute;
    background: #270024;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
    height: ${(props) => (props.isOpen ? `${props.numMenuItems * 4}rem` : "0px")};
    width: 100vw;
    padding: ${(props) => (props.isOpen ? "1rem" : "0px")} 1rem;
  }
`;

const ChildrenContainer = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

export default DashboardLayout;

export const getDashboardLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;