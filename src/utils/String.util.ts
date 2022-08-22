export const isValidWalletAddress = (address: string) => {
  const regexp = /^k:[0-9A-Fa-f]+$/g;
  return regexp.test(address);
};

export const shortenWalletAddress = (walletAddress: string) => {
  if (walletAddress.length <= 11) {
    return walletAddress;
  }

  return `${walletAddress.slice(0, 7)}...${walletAddress.slice(-4)}`;
};
