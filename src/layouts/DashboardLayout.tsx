import styled from "@emotion/styled";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useState } from "react";
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
}

const MENU_ICON = {
  [MENU_TITLE.DASHBOARD]: <DashboardOutlinedIcon />,
  [MENU_TITLE.NFT]: <PhotoLibraryOutlinedIcon />,
  [MENU_TITLE.PROJECT_HISTORY]: <TimelineOutlinedIcon />,
};

const DashboardLayout = (props: Props) => {
  const { children } = props;

  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState<MENU_TITLE>(MENU_TITLE.DASHBOARD);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const [isDashboardLoading, setIsDashboardLoading] = useState(true);

  const { walletAddress } = useWalletAddress();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setIsSideBarOpen(!isMobile);
  }, [isMobile]);

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleMenuClick = (title: MENU_TITLE) => {
    setActiveMenu(title);
    if (isMobile) {
      setIsSideBarOpen(false);
    }
  };

  const handleSideBarToggle = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

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
        </ProjectLogo>
        {isMobile ? <HamburgerMenu onClick={handleSideBarToggle} fontSize="medium" sx={{ color: "#b3b3b3" }} /> : null}
      </LeftNavBar>
      <RightNavBar maxWidth="md">
        <SearchWalletInput initialWalletAddress={walletAddress} isLoading={isDashboardLoading} />
      </RightNavBar>
    </NavBar>
  );

  const sideBar = (
    <SideBar isOpen={isSideBarOpen}>
      <MenuButtons>
        {Object.values(MENU_TITLE).map((title) => (
          <MenuButton key={title} isActive={title === activeMenu} onClick={() => handleMenuClick(title)}>
            {MENU_ICON[title]}
            {title}
          </MenuButton>
        ))}
      </MenuButtons>
    </SideBar>
  );

  return (
    <DashboardLayoutContext.Provider value={{ isDashboardLoading, setIsDashboardLoading }}>
      <Wrapper>
        {navBar}
        <Content>
          {sideBar}
          <ChildrenContainer>{children}</ChildrenContainer>
        </Content>
      </Wrapper>
    </DashboardLayoutContext.Provider>
  );
};

const HamburgerMenu = styled(MenuSharpIcon)`
  cursor: pointer;
`;

const RightNavBar = styled(Container)`
  flex-grow: 1;
`;

const LeftNavBar = styled.div`
  min-width: 15rem;

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
  padding: 0 2rem;

  ${theme.breakpoints.down("md")} {
    height: 1.5rem;
    padding: 0;
    gap: 4px;
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
  font-size: 20px;
`;

const LogoContainer = styled(Box)({
  position: "relative",
  width: "2rem",
  height: "100%",
});

type MenuButtonProps = {
  isActive?: boolean;
};

const MenuButton = styled.div<MenuButtonProps>`
  font-weight: 500;
  padding: 0.5rem 1rem;
  width: 100%;
  background: ${(props) => (props.isActive ? "linear-gradient(101.68deg, #6502e2 -6%, #ff007f 100%)" : "none")};
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition-duration: 300ms;
  transition-property: background, background-color;
  display: flex;
  gap: 8px;
  align-items: center;
  white-space: nowrap;

  &:hover {
    background-color: rgb(255, 255, 255, 0.1);
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
};

const SideBar = styled.div<SideBarProps>`
  width: ${(props) => (props.isOpen ? "17rem" : "0px")};
  padding: 3rem ${(props) => (props.isOpen ? "2rem" : "0px")};
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.246) 100%);
  overflow: hidden;
  z-index: 1;

  ${theme.breakpoints.down("md")} {
    transition: height 0.5s, padding 0.5s;
    position: absolute;
    background: #270024;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
    height: ${(props) => (props.isOpen ? "12rem" : "0px")};
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
