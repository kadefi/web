export const roundToDecimal = (num: number, decimalDigits: number) => {
  return (
    Math.round((num + Number.EPSILON) * Math.pow(10, decimalDigits)) / Math.pow(10, decimalDigits)
  ).toLocaleString(undefined, { minimumFractionDigits: 2 });
};

export const formatFiatValue = (num: number) => {
  return `$${roundToDecimal(num, 2)}`;
};
