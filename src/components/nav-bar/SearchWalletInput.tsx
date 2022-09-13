import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import CircularProgress from "../../commons/CircularProgress";
import TextField from "../../commons/TextField";
import { showToast, ToastType } from "../../commons/Toast";
import { Route } from "../../enums/Route.enum";
import { isValidWalletAddress } from "../../utils/String.util";

type Props = {
  isLoading?: boolean;
  customBorderRadius?: string;
};

const SearchWalletInput = (props: Props) => {
  const { isLoading = false, customBorderRadius } = props;
  const [input, setInput] = useState("");
  const router = useRouter();
  const ref = useRef<HTMLInputElement>();

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleSearchWallet = (value: string) => {
    const cleanedAddress = value.toLowerCase().trim();

    if (!isValidWalletAddress(cleanedAddress)) {
      showToast(ToastType.Error, "Wallet syntax is invalid");
      return;
    }

    if (ref.current) {
      ref.current.blur();
    }

    setInput("");

    if (router.pathname === Route.Home) {
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
        onKeyDown={handleWalletInputEnter}
        fullWidth
        placeholder="Search a wallet address"
        startIcon={{ component: <SearchIcon sx={{ color: "#ffffff9e" }} /> }}
        endIcon={{
          component: endIconComponent,
          onClick: handleSearchWallet,
        }}
        customBorderRadius={customBorderRadius}
      />
    </>
  );
};

export default SearchWalletInput;
