import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import CircularProgress from "../../commons/CircularProgress";
import SnackBarAlert from "../../commons/SnackBarAlert";
import TextField from "../../commons/TextField";
import { ROUTE } from "../../constants/Routes.constant";
import { isValidWalletAddress } from "../../utils/String.util";

type Props = {
  isLoading?: boolean;
};

const SearchWalletInput = (props: Props) => {
  const { isLoading = false } = props;
  const [isErrorNotiOpen, setIsErrorNotiOpen] = useState(false);
  const [input, setInput] = useState("");
  const router = useRouter();
  const ref = useRef<HTMLInputElement>();

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleSearchWallet = (value: string) => {
    const cleanedAddress = value.toLowerCase().trim();

    if (!isValidWalletAddress(cleanedAddress)) {
      setIsErrorNotiOpen(true);
      return;
    }

    if (ref.current) {
      ref.current.blur();
    }

    setInput("");

    if (router.pathname === ROUTE.HOME) {
      router.push({ pathname: "/dashboard", query: { wallet: [cleanedAddress] } });
      return;
    }

    router.push({ pathname: "/dashboard", query: { wallet: [cleanedAddress] } });
  };

  const handleWalletInputEnter = (e: any) => {
    if (e && e.target && e.key == "Enter") {
      handleSearchWallet(e.target.value);
    }
  };

  const handleErrorNotiClose = () => {
    setIsErrorNotiOpen(false);
  };

  const endIconComponent = isLoading ? (
    <CircularProgress disableShrink size={20} sx={{ opacity: 0.5 }} />
  ) : (
    <ArrowForwardRoundedIcon sx={{ color: "#ffffff9e" }} />
  );

  return (
    <>
      <TextField
        input={input}
        onInputChange={handleInputChange}
        type="text"
        inputRef={ref}
        disabled={isLoading}
        onKeyDown={handleWalletInputEnter}
        fullWidth
        placeholder="Search a wallet address"
        startIcon={{ component: <SearchIcon sx={{ color: "#ffffff9e" }} /> }}
        endIcon={{
          component: endIconComponent,
          onClick: handleSearchWallet,
        }}
      />
      <SnackBarAlert
        isOpen={isErrorNotiOpen}
        handleClose={handleErrorNotiClose}
        message="Wallet address syntax looks invalid"
        severity="error"
      />
    </>
  );
};

export default SearchWalletInput;
