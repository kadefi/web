import CustomTable from "../../../commons/Table/CustomTable";
import { WALLET_TABLE_HEADERS } from "./WalletDataTable";

const EmptyWallet = () => {
  return (
    <CustomTable
      tableKey="Wallet"
      headers={WALLET_TABLE_HEADERS}
      rows={[]}
      isWalletTable
      emptyTablePlaceholder="Your Wallet is Empty"
    />
  );
};

export default EmptyWallet;
