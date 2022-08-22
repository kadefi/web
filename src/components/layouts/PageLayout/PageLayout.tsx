import styled from "@emotion/styled";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useState, MouseEvent } from "react";
import { PageLayoutContext } from "../../../contexts/PageLayoutContext";
import { useNftCollectionsList } from "../../../hooks/useNftCollectionsList";
import { useProjectsList } from "../../../hooks/useProjectsList";
import { useWalletAddresses } from "../../../hooks/useWalletAddress";
import theme from "../../../theme";
import { getRecentWalletsLS } from "../../../utils/LocalStorage.util";
import { MENU_CONFIG, MENU_TITLE } from "./Menu.config";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

type Props = {
  children: ReactNode;
};

const PageLayout = (props: Props) => {
  const { children } = props;
  const router = useRouter();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false); // Default to close sidebar (only for mobile)
  const projectListStates = useProjectsList();
  const nftCollectionsListStates = useNftCollectionsList();
  const { walletAddresses } = useWalletAddresses();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setIsSideBarOpen(!isMobile);
  }, [isMobile]);

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

    let redirectWallet = walletAddresses && walletAddresses[0];

    if (!redirectWallet) {
      const recentWallets = getRecentWalletsLS();
      if (recentWallets) {
        redirectWallet = recentWallets[0];
      }
    }

    if (MENU_CONFIG[title].isWalletSearch) {
      router.push(`${MENU_CONFIG[title].route}/${redirectWallet}`);
    } else {
      router.push(`${MENU_CONFIG[title].route}`);
    }

    handleSideBarClose();
  };

  return (
    <PageLayoutContext.Provider
      value={{
        walletAddresses,
        ...projectListStates,
        ...nftCollectionsListStates,
      }}
    >
      <Wrapper>
        <NavBar handleSideBarToggle={handleSideBarToggle} handleSideBarClose={handleSideBarClose} />
        <Content onClick={handleSideBarClose}>
          <SideBar isSideBarOpen={isSideBarOpen} handleMenuClick={handleMenuClick} />
          <ChildrenContainer>{children}</ChildrenContainer>
        </Content>
      </Wrapper>
    </PageLayoutContext.Provider>
  );
};

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

const ChildrenContainer = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

export default PageLayout;

export const getPageLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
