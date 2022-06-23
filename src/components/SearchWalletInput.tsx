import CustomTextField from "./commons/CustomTextField";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useRouter } from "next/router";
import CustomCircularProgress from "./commons/CustomCircularProgress";
import { useRef } from "react";

type Props = {
  initialWalletAddress?: string;
  isLoading?: boolean;
};

const SearchWalletInput = (props: Props) => {
  const { initialWalletAddress, isLoading = false } = props;

  const router = useRouter();
  const ref = useRef<HTMLInputElement>();

  const handleSearchWallet = (value: string) => {
    if (ref.current) {
      ref.current.blur();
    }

    router.push(`/dashboard/${value}`);
  };

  const handleWalletInputEnter = (e: any) => {
    if (e && e.target && e.key == "Enter") {
      handleSearchWallet(e.target.value);
    }
  };

  const endIconComponent = isLoading ? (
    <CustomCircularProgress disableShrink size={20} sx={{ opacity: 0.5 }} />
  ) : (
    <ArrowForwardRoundedIcon sx={{ color: "#ffffff9e" }} />
  );

  return (
    <CustomTextField
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
  );
};

export default SearchWalletInput;
