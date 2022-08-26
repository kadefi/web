import styled from "@emotion/styled";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { PageLayoutContext } from "../../../contexts/PageLayoutContext";
import { useNftCollectionsList } from "../../../hooks/useNftCollectionsList";
import { useProjectsList } from "../../../hooks/useProjectsList";
import { useWalletAddresses } from "../../../hooks/useWalletAddress";
import theme from "../../../theme";
import MultiWalletPills from "./MultiWalletPills";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

type Props = {
  children: ReactNode;
};

const PageLayout = (props: Props) => {
  const { children } = props;
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
          <SideBar isOpen={isSideBarOpen} onClose={handleSideBarClose} />
          <ChildrenContainer>
            <MultiWalletPills />
            {children}
          </ChildrenContainer>
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
