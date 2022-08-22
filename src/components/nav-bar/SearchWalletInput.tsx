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
  initialWalletAddress?: string;
  isLoading?: boolean;
};

const SearchWalletInput = (props: Props) => {
  // Props
  const { initialWalletAddress, isLoading = false } = props;

  // States
  const [isErrorNotiOpen, setIsErrorNotiOpen] = useState(false);

  // Custom hooks
  const router = useRouter();
  const ref = useRef<HTMLInputElement>();

  // Handlers
  const handleSearchWallet = (value: string) => {
    const cleanedAddress = value.toLowerCase().trim();

    if (!isValidWalletAddress(cleanedAddress)) {
      setIsErrorNotiOpen(true);
      return;
    }

    if (ref.current) {
      ref.current.blur();
    }

    if (router.pathname === ROUTE.HOME) {
      router.push(`${ROUTE.DASHBOARD}/${cleanedAddress}`);
      return;
    }

    router.push(`${router.pathname}`.replace("[walletAddress]", cleanedAddress));
  };

  const handleWalletInputEnter = (e: any) => {
    if (e && e.target && e.key == "Enter") {
      handleSearchWallet(e.target.value);
    }
  };

  const handleErrorNotiClose = () => {
    setIsErrorNotiOpen(false);
  };

  // Display components
  const endIconComponent = isLoading ? (
    <CircularProgress disableShrink size={20} sx={{ opacity: 0.5 }} />
  ) : (
    <ArrowForwardRoundedIcon sx={{ color: "#ffffff9e" }} />
  );

  return (
    <>
      <TextField
        type="text"
        inputRef={ref}
        initialValue={initialWalletAddress}
        onKeyDown={handleWalletInputEnter}
        fullWidth
        placeholder="Enter your wallet address"
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
