export const roundToDecimalStr = (num: number, decimalDigits: number) => {
  return roundToDecimal(num, decimalDigits).toLocaleString(undefined, { minimumFractionDigits: 2 });
};

export const roundToDecimal = (num: number, decimalDigits: number) => {
  return Math.round((num + Number.EPSILON) * Math.pow(10, decimalDigits)) / Math.pow(10, decimalDigits);
};

export const formatFiatValue = (num: number) => {
  return `$${roundToDecimalStr(num, 2)}`;
};
