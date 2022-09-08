import styled from "@emotion/styled";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, useMediaQuery } from "@mui/material";
import Modal from "@mui/material/Modal";
import { uniq } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import TextField from "../../../commons/TextField";
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
  bookmarkName: string;
  walletAddresses: string[];
  isModalOpen: boolean;
  handleClose: () => void;
};

const ConfigureBookmarkModal = (props: Props) => {
  const { bookmarkName, isModalOpen, handleClose, walletAddresses } = props;
  const [wallets, setWallets] = useState<string[]>(walletAddresses);
  const [isInvalidAddress, setIsInvalidAddress] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>();
  const isMaxWalletsReached = wallets.length >= MAX_NUM_WALLETS;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  useEffect(() => {
    if (isModalOpen) {
      setInput("");
      setWallets(walletAddresses);
      setIsInvalidAddress(false);
    }
  }, [isModalOpen, walletAddresses]);

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleWalletRemove = (removedWallet: string) => {
    setWallets((prevWallets) => prevWallets.filter((wallet) => wallet != removedWallet));
  };

  const handleWalletAdd = (value: string) => {
    const { isValid, cleanedAddress } = checkValidWallet(value);

    if (!isValid) {
      setIsInvalidAddress(true);
      return;
    }

    setIsInvalidAddress(false);
    setInput("");

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

  const handleSaveButtonClick = () => {
    if (wallets.length === 0) {
      handleDeleteButtonClick();
      return;
    }

    if (input.length === 0) {
      handleClose();
      bookmarkLS().addBookmark(bookmarkName, uniq(wallets));
      router.push({ pathname: router.pathname, query: { wallet: uniq(wallets) } });
      return;
    }

    const { isValid, cleanedAddress } = checkValidWallet(input);

    if (!isValid) {
      setIsInvalidAddress(true);
      return;
    }

    const newWallets = uniq([...wallets, cleanedAddress]);

    bookmarkLS().addBookmark(bookmarkName, newWallets);

    if (router.isReady) {
      router.push({ pathname: router.pathname, query: { wallet: newWallets } });
    }

    handleClose();
  };

  const handleDeleteButtonClick = () => {
    bookmarkLS().removeBookmark(bookmarkName);
    handleClose();
  };

  return (
    <>
      <Modal open={isModalOpen} onClose={handleClose}>
        <Container>
          <ModalTitle>Configure Bookmark: {bookmarkName}</ModalTitle>
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
              error={isInvalidAddress}
              helperText={isInvalidAddress ? "Invalid address" : ""}
              input={input}
              onInputChange={handleInputChange}
              type="text"
              autoFocus={!isMobile}
              onKeyDown={handleWalletInputEnter}
              endIcon={{
                component: <AddWalletIcon />,
                onClick: handleWalletAdd,
              }}
              fullWidth
              placeholder={isMaxWalletsReached ? `Max ${MAX_NUM_WALLETS} wallets added` : "Add a new wallet address"}
            />
          </WalletListContainer>
          <ButtonContainer>
            <Button color="warning" variant="contained" onClick={handleDeleteButtonClick}>
              Delete
            </Button>
            <Button variant="contained" onClick={handleSaveButtonClick}>
              Save
            </Button>
          </ButtonContainer>
        </Container>
      </Modal>
    </>
  );
};

const AddWalletIcon = styled(AddRoundedIcon)`
  background-color: #ff007f;
  border-radius: 32px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
  gap: 1rem;
`;

const WalletListContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
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
  max-width: 700px;
  background-color: #281629;
  padding: 2rem;
  outline: 0;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  ${theme.breakpoints.down("sm")} {
    padding: 16px;
  }
`;

export default ConfigureBookmarkModal;
