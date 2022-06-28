export const isValidWalletAddress = (address: string) => {
  const regexp = /^(k:)?[0-9A-Fa-f]+$/g;
  return regexp.test(address);
};
