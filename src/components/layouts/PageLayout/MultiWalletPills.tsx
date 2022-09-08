import styled from "@emotion/styled";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Container as MuiContainer, Tooltip, useMediaQuery } from "@mui/material";
import { isEmpty, isEqual } from "lodash";
import { ReactElement, useEffect, useState } from "react";
import SnackBarAlert from "../../../commons/SnackBarAlert";
import { usePageLayoutContext } from "../../../contexts/PageLayoutContext";
import { useCurrentMenu } from "../../../hooks/useCurrentMenu";
import theme from "../../../theme";
import WalletPill from "../../misc/WalletPill";
import AddBookmarkModal from "./AddBookmarkModal";
import AddWalletModal from "./AddWalletModal";
import ConfigureBookmarkModal from "./ConfigureBookmarkModal";

const MultiWalletPills = () => {
  const { currentMenu } = useCurrentMenu();
  const { walletAddresses } = usePageLayoutContext();
  const { isWalletSearch } = currentMenu;

  return (
    <Wrapper maxWidth="md">
      {isWalletSearch && (
        <>
          <WalletsHeaderContainer></WalletsHeaderContainer>
          <Container>
            <TopActions>
              <FavouriteButton />
              <CopyUrlButton />
            </TopActions>
            <WalletPillsContainer>
              {walletAddresses?.map((walletAddress) => (
                <WalletPill
                  key={`wallet-selector-${walletAddress}`}
                  walletAddress={walletAddress}
                  isPillShape
                  isCopiable
                />
              ))}
              <ConfigureWalletsButton />
            </WalletPillsContainer>
          </Container>
        </>
      )}
    </Wrapper>
  );
};

const CopyUrlButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsOpen(true);
  };

  return (
    <>
      <ActionButton
        icon={<LinkRoundedIcon sx={{ transform: "rotate(135deg)" }} />}
        onClick={handleClick}
        tooltip="Copy Dashboard URL"
      />
      <SnackBarAlert
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        message="Dashboard URL Copied to Clipboard"
        severity="success"
      />
    </>
  );
};

const FavouriteButton = () => {
  const { walletAddresses, bookmarks, refreshBookmarks } = usePageLayoutContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openBookmarkName, setOpenBookmarkName] = useState<string | null>(null);

  const currentBookmark = walletAddresses
    ? Object.keys(bookmarks).filter((bookmarkKey) => isEqual(walletAddresses.sort(), bookmarks[bookmarkKey].sort()))
    : [];

  const isBookmarked = currentBookmark.length > 0;

  const currentBookmarkName = isBookmarked ? currentBookmark[0] : undefined;

  const icon = isBookmarked ? <StarIcon color="primary" /> : <StarBorderOutlinedIcon />;

  const tooltipText = isBookmarked ? "Bookmarked" : "Bookmark Search Config";

  useEffect(() => {
    refreshBookmarks();
  }, [isModalOpen, refreshBookmarks, openBookmarkName]);

  const handleOpenBookmarkModal = () => {
    if (isBookmarked) {
      currentBookmarkName && setOpenBookmarkName(currentBookmarkName);
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      <ActionButton
        icon={icon}
        onClick={handleOpenBookmarkModal}
        tooltip={tooltipText}
        text={currentBookmarkName}
        isTextCollapsible={false}
      />
      {walletAddresses && (
        <AddBookmarkModal
          walletAddresses={walletAddresses}
          isModalOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
        />
      )}
      {openBookmarkName && !isEmpty(bookmarks) && (
        <ConfigureBookmarkModal
          bookmarkName={openBookmarkName}
          walletAddresses={bookmarks[openBookmarkName]}
          isModalOpen={openBookmarkName !== null}
          handleClose={() => setOpenBookmarkName(null)}
        />
      )}
    </>
  );
};

const ConfigureWalletsButton = () => {
  const { walletAddresses } = usePageLayoutContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ActionButton
        icon={<SettingsIcon />}
        text="Configure"
        onClick={() => setIsModalOpen(true)}
        tooltip="Add / Remove Wallets"
      />
      {walletAddresses && (
        <AddWalletModal
          walletAddresses={walletAddresses}
          isModalOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

const ActionButton = (props: {
  icon: ReactElement;
  text?: string;
  tooltip?: string;
  onClick: () => void;
  isTextCollapsible?: boolean;
}) => {
  const { icon, text = null, tooltip, onClick, isTextCollapsible = true } = props;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isCompactDesign = !text || (isTextCollapsible && isMobile);

  const actionButton = (
    <ActionButtonContainer onClick={onClick} style={{ padding: isCompactDesign ? "4px" : "4px 12px 4px 8px" }}>
      {icon}
      {!isCompactDesign && text}
    </ActionButtonContainer>
  );

  return tooltip ? (
    <Tooltip title={tooltip} placement="bottom" arrow>
      {actionButton}
    </Tooltip>
  ) : (
    actionButton
  );
};

const Container = styled.div``;

const TopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const WalletsHeaderContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 1rem;
`;

const Wrapper = styled(MuiContainer)`
  margin-bottom: 1rem;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: rgb(0 0 0 / 50%);
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: 300ms;
  color: #b2b2b2;

  ${theme.breakpoints.down("sm")} {
    padding: 4px;
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
