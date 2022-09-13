import styled from "@emotion/styled";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useMediaQuery, Modal, Button } from "@mui/material";
import { uniq } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import TextField from "../../../commons/TextField";
import { showToast, ToastType } from "../../../commons/Toast";
import TypographyNeon from "../../../commons/TypographyNeon";
import theme from "../../../theme";
import { bookmarkLS } from "../../../utils/LocalStorage.util";
import { isValidWalletAddress } from "../../../utils/String.util";
import WalletPill from "../../misc/WalletPill";

const checkValidWallet = (wallet: string) => {
  const cleanedAddress = wallet.toLowerCase().trim();
  return { isValid: isValidWalletAddress(cleanedAddress), cleanedAddress };
};

const MAX_NUM_WALLETS = 5;

type Props = {
  isModalOpen: boolean;
  handleClose: () => void;
};

const AddNewBookmarkModal = (props: Props) => {
  const { isModalOpen, handleClose } = props;
  const [wallets, setWallets] = useState<string[]>([]);
  const [walletInput, setWalletInput] = useState("");
  const [bookmarkNameInput, setBookmarkNameInput] = useState("");
  const inputRef = useRef<HTMLInputElement>();
  const router = useRouter();
  const isMaxWalletsReached = wallets.length >= MAX_NUM_WALLETS;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isModalOpen) {
      setWalletInput("");
      setBookmarkNameInput("");
      setWallets([]);
    }
  }, [isModalOpen]);

  const handleWalletRemove = (removedWallet: string) => {
    setWallets((prevWallets) => prevWallets.filter((wallet) => wallet != removedWallet));
  };

  const handleWalletAdd = (value: string) => {
    const { isValid, cleanedAddress } = checkValidWallet(value);

    if (!isValid) {
      showToast(ToastType.Error, "Invalid wallet address");
      return;
    }

    setWalletInput("");

    if (inputRef.current) {
      inputRef.current.focus();
    }

    setWallets((prevWallets) => uniq([...prevWallets, cleanedAddress]));
  };

  const handleWalletInputEnter = (e: any) => {
    if (e && e.target && e.key == "Enter") {
      handleWalletAdd(e.target.value);
    }
  };

  const handleBookmarkAdd = () => {
    if (bookmarkNameInput === "") {
      showToast(ToastType.Error, "Please enter bookmark name");
      return;
    }

    if (wallets.length === 0) {
      showToast(ToastType.Error, "Please specify list of wallets for the bookmark");
      return;
    }

    bookmarkLS().addBookmark(bookmarkNameInput, wallets);

    if (router.isReady) {
      handleClose();
      router.push({ pathname: router.pathname, query: { wallet: uniq(wallets) } });
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Container>
        <ModalTitle>Create New Bookmark</ModalTitle>
        <TextField
          input={bookmarkNameInput}
          onInputChange={(value: string) => setBookmarkNameInput(value.slice(0, 20))}
          type="text"
          autoFocus={!isMobile}
          fullWidth
          placeholder="Enter bookmark name"
          endIcon={{
            component: <WordCounter>{`${bookmarkNameInput.length} / 20`}</WordCounter>,
          }}
        />
        <ActionContainer>
          <TypographyNeon>Wallets</TypographyNeon>
          <WalletListContainer>
            {wallets.map((address) => (
              <WalletPill
                key={`modal-wallet-selector-${address}`}
                walletAddress={address}
                isShortened={false}
                isPillShape
                isRemovable
                isFullWidth
                onRemove={handleWalletRemove}
              />
            ))}
            <TextField
              disabled={isMaxWalletsReached}
              inputRef={inputRef}
              input={walletInput}
              onInputChange={(value: string) => setWalletInput(value)}
              type="text"
              onKeyDown={handleWalletInputEnter}
              endIcon={{
                component: <AddWalletIcon />,
                onClick: handleWalletAdd,
              }}
              fullWidth
              placeholder={isMaxWalletsReached ? `Max ${MAX_NUM_WALLETS} wallets added` : "Add a new wallet address"}
            />
          </WalletListContainer>
        </ActionContainer>
        <ButtonContainer>
          <Button variant="contained" onClick={handleBookmarkAdd}>
            Create Bookmark
          </Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

const WordCounter = styled.div`
  font-size: 12px;
  color: grey;
`;

const ActionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #793d5a;
  border-radius: 8px;
  padding: 1rem;
  padding-bottom: 1.5rem;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;

  ${theme.breakpoints.down("md")} {
    min-height: 0;
  }
`;

const AddWalletIcon = styled(AddRoundedIcon)`
  background-color: #ff007f;
  border-radius: 32px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`;

const WalletListContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
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

  ${theme.breakpoints.down("sm")} {
    padding: 16px;
  }
`;

export default AddNewBookmarkModal;
