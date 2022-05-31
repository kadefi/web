import CustomTextField from "./commons/CustomTextField";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useRouter } from "next/router";

type Props = {
  initialWalletAddress?: string;
};

const SearchWalletInput = (props: Props) => {
  const { initialWalletAddress } = props;

  const router = useRouter();

  const handleSearchWallet = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const handleWalletInputEnter = (e: any) => {
    if (e && e.target && e.key == "Enter") {
      handleSearchWallet(e.target.value);
    }
  };

  return (
    <CustomTextField
      initialValue={initialWalletAddress}
      onKeyDown={handleWalletInputEnter}
      fullWidth
      placeholder="Enter your wallet address"
      endIcon={{
        component: <ArrowForwardRoundedIcon />,
        onClick: handleSearchWallet,
      }}
    />
  );
};

export default SearchWalletInput;
