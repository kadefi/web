import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { isEmpty } from "lodash";
import { useEffect, useRef, useState } from "react";
import TextField from "../../../commons/TextField";
import { showToast, ToastType } from "../../../commons/Toast";
import TypographyNeon from "../../../commons/TypographyNeon";
import theme from "../../../theme";
import { bookmarkLS } from "../../../utils/LocalStorage.util";

type Props = {
  walletAddresses: string[];
  isModalOpen: boolean;
  handleClose: () => void;
};

const BookmarkCurrentModal = (props: Props) => {
  const { walletAddresses, isModalOpen, handleClose } = props;
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isModalOpen) {
      setInput("");
    }
  }, [isModalOpen, walletAddresses]);

  const handleBookmarkAdd = (name: string) => {
    bookmarkLS().addBookmark(name, walletAddresses);
    setInput("");
    handleClose();
    showToast(ToastType.Success, "Bookmark created");
  };

  const handleInputChange = (value: string) => {
    setInput(value.slice(0, 20));
  };

  const handleWalletInputEnter = (e: any) => {
    if (e && e.target && e.key == "Enter") {
      handleBookmarkAdd(e.target.value);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Container>
        <ModalTitle>Bookmark Current Dashboard</ModalTitle>
        <ActionsWrapper>
          <ActionContainer>
            <TypographyNeon>Create New</TypographyNeon>
            <TextField
              inputRef={inputRef}
              input={input}
              onInputChange={handleInputChange}
              type="text"
              autoFocus={!isMobile}
              onKeyDown={handleWalletInputEnter}
              fullWidth
              placeholder="Enter bookmark name"
              endIcon={{
                component: <WordCounter>{`${input.length} / 20`}</WordCounter>,
              }}
            />
            <ButtonContainer>
              <Button variant="contained" onClick={() => handleBookmarkAdd(input)}>
                Save
              </Button>
            </ButtonContainer>
          </ActionContainer>
          <ActionContainer>
            <TypographyNeon>Overwrite Existing</TypographyNeon>
            <ExistingBookmarksContainer>
              {!isEmpty(bookmarkLS().get()) ? (
                Object.keys(bookmarkLS().get()).map((bookmarkName) => (
                  <ExistingBookmark key={`bookmark-${bookmarkName}`} onClick={() => handleBookmarkAdd(bookmarkName)}>
                    {bookmarkName}
                  </ExistingBookmark>
                ))
              ) : (
                <NoExistingBookmark>You have no existing bookmark</NoExistingBookmark>
              )}
            </ExistingBookmarksContainer>
          </ActionContainer>
        </ActionsWrapper>
      </Container>
    </Modal>
  );
};

const NoExistingBookmark = styled.div`
  text-align: center;
  color: gray;
`;

const WordCounter = styled.div`
  font-size: 12px;
  color: grey;
`;

const ExistingBookmarksContainer = styled.div`
  max-height: 300px;
  overflow: auto;
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const ExistingBookmark = styled.div`
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 8px 0;
  border-radius: 2rem;
  transition: 300ms;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ActionsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  ${theme.breakpoints.down("md")} {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

const ActionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #793d5a;
  border-radius: 8px;
  min-height: 200px;
  padding: 1rem;
  gap: 1rem;

  ${theme.breakpoints.down("md")} {
    min-height: 0;
  }
`;

const ModalTitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 900px;
  background-color: #281629;
  padding: 2rem;
  outline: 0;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  ${theme.breakpoints.down("md")} {
    padding: 16px;
  }
`;

export default BookmarkCurrentModal;
