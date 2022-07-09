import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { trackWalletSearchEvent } from "../analytics/Analytics.util";
import { ROUTE } from "../constants/Routes.constant";
import { addNewRecentWalletLS } from "../utils/LocalStorage.util";
import { isValidWalletAddress } from "../utils/String.util";
import CustomCircularProgress from "./commons/CustomCircularProgress";
import CustomTextField from "./commons/CustomTextField";
import SnackBarAlert from "./commons/SnackBarAlert";

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

    // Save recent wallet to local storage
    addNewRecentWalletLS(cleanedAddress);

    // Track new wallet search event on Amplitude
    trackWalletSearchEvent(cleanedAddress);

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
    <CustomCircularProgress disableShrink size={20} sx={{ opacity: 0.5 }} />
  ) : (
    <ArrowForwardRoundedIcon sx={{ color: "#ffffff9e" }} />
  );

  return (
    <>
      <CustomTextField
        type="text"
        inputRef={ref}
        disabled={isLoading}
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
