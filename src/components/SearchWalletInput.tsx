import CustomTextField from "./commons/CustomTextField";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useRouter } from "next/router";
import CustomCircularProgress from "./commons/CustomCircularProgress";
import { useRef, useState } from "react";
import { isValidWalletAddress } from "../utils/String.util";
import SnackBarAlert from "./commons/SnackBarAlert";

type Props = {
  initialWalletAddress?: string;
  isLoading?: boolean;
};

const SearchWalletInput = (props: Props) => {
  const { initialWalletAddress, isLoading = false } = props;

  const [isErrorNotiOpen, setIsErrorNotiOpen] = useState(false);

  const router = useRouter();
  const ref = useRef<HTMLInputElement>();

  const handleSearchWallet = (value: string) => {
    const cleanedAddress = value.toLowerCase().trim();

    if (!isValidWalletAddress(cleanedAddress)) {
      setIsErrorNotiOpen(true);
      return;
    }

    if (ref.current) {
      ref.current.blur();
    }

    router.push(`/dashboard/${cleanedAddress}`);
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
    <CustomCircularProgress disableShrink size={20} sx={{ opacity: 0.5 }} />
  ) : (
    <ArrowForwardRoundedIcon sx={{ color: "#ffffff9e" }} />
  );

  return (
    <>
      <CustomTextField
        type="search"
        inputRef={ref}
        disabled={isLoading}
        initialValue={initialWalletAddress}
        onKeyDown={handleWalletInputEnter}
        fullWidth
        placeholder="Enter your wallet address"
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
