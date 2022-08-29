export const isValidWalletAddress = (address: string) => {
  const regexp = /^k:[0-9A-Fa-f]+$/g;
  return regexp.test(address);
};

export const shortenWalletAddress = (walletAddress: string, frontCount: number = 4, backCount: number = 4) => {
  const TOTAL = frontCount + backCount + 2;

  if (walletAddress.length <= TOTAL) {
    return walletAddress;
  }

  if (frontCount > 0 && backCount === 0) {
    return `${walletAddress.slice(0, 2 + frontCount)}`;
  }

  return `${walletAddress.slice(0, 2 + frontCount)}...${walletAddress.slice(-backCount)}`;
};
