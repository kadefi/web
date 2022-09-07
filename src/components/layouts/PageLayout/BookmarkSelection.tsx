import styled from "@emotion/styled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { isEmpty, uniq } from "lodash";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { usePageLayoutContext } from "../../../contexts/PageLayoutContext";
import { useIsOpen } from "../../../hooks/useIsOpen";
import useOffsetHeight from "../../../hooks/useOffsetHeight";
import ConfigureBookmarkModal from "./ConfigureBookmarkModal";

const BookmarkSelection = () => {
  const { bookmarks, refreshBookmarks } = usePageLayoutContext();
  const { ref: bookmarkOpenRef, isOpen, setIsOpen } = useIsOpen(false);
  const { ref: bookmarkButtonRef, offsetHeight } = useOffsetHeight<HTMLDivElement>();
  const router = useRouter();
  const [openBookmarkName, setOpenBookmarkName] = useState<string | null>(null);

  useEffect(() => {
    refreshBookmarks();
  }, [openBookmarkName, refreshBookmarks]);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleBookmarkItemClick = (bookmarkName: string) => {
    if (router.isReady && bookmarkName in bookmarks) {
      router.push({ pathname: router.pathname, query: { wallet: uniq(bookmarks[bookmarkName]) } });
    }
  };

  return (
    <>
      <BookmarkBar onClick={handleDropdownToggle} ref={bookmarkOpenRef}>
        <BookmarkButton ref={bookmarkButtonRef}>
          Bookmarks
          <ArrowDropDownIcon />
        </BookmarkButton>
        <BookmarksDropdown $isOpen={isOpen} $itemsCount={Object.keys(bookmarks).length} $offsetHeight={offsetHeight}>
          {!isEmpty(bookmarks) ? (
            Object.keys(bookmarks).map((bookmarkName) => (
              <BookmarkItemContainer key={`bookmark-dropdown-${bookmarkName}`}>
                <BookmarkItem onClick={() => handleBookmarkItemClick(bookmarkName)}>{bookmarkName}</BookmarkItem>
                <DeleteBookmarkIcon fontSize="small" onClick={() => setOpenBookmarkName(bookmarkName)} />
              </BookmarkItemContainer>
            ))
          ) : (
            <NoBookmarkText>You have no bookmark</NoBookmarkText>
          )}
        </BookmarksDropdown>
      </BookmarkBar>
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

const NoBookmarkText = styled.div`
  padding: 6px 8px;
`;

const BookmarkItemContainer = styled.div`
  position: relative;
`;

const DeleteBookmarkIcon = styled(SettingsRoundedIcon)`
  position: absolute;
  right: 6px;
  top: 7px;
  border-radius: 16px;
  padding: 2px;
  transition: 150ms;

  &:hover {
    background-color: #ff007f;
  }
`;

const BookmarkItem = styled.div`
  padding: 6px 8px;
  border-radius: 4px;
  transition: 150ms;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding-right: 3rem;

  &:hover {
    background-color: #ff007f;
  }
`;

type BookmarksDropdownProps = {
  $isOpen: boolean;
  $itemsCount: number;
  $offsetHeight: number | null;
};

const BookmarksDropdown = styled.div<BookmarksDropdownProps>`
  transition: height 300ms;
  height: ${(props) => (props.$isOpen ? `${(props.$itemsCount || 1) * 33}px` : "0")};
  position: absolute;
  width: 100px;
  background-color: rgb(117 53 87);
  /* background-color: rgb(39 0 37); */
  color: white;
  font-size: 14px;
  white-space: nowrap;
  width: fit-content;
  min-width: 130px;
  max-width: 500px;
  top: ${(props) => (props.$offsetHeight ? `${props.$offsetHeight + 4}px` : 0)};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 15px;
`;

const BookmarkBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  cursor: pointer;
`;

const BookmarkButton = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 7.5px 8px 7.5px 16px;
  color: #ffffff9e;
  font-size: 15px;
  border-radius: 32px 0 0 32px;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export default BookmarkSelection;
