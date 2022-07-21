import round from "lodash/round";

export const roundToDecimalStr = (num: number, decimalDigits: number) => {
  return round(num, decimalDigits).toLocaleString("en-US", { minimumFractionDigits: 2 });
};

export const formatFiatValue = (num: number, decimals: number = 2) => {
  return `$${roundToDecimalStr(num, decimals)}`;
};
