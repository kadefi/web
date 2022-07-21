import round from "lodash/round";
import numeral from "numeral";

export const roundToDecimalStr = (num: number, decimalDigits: number) => {
  let optionalDigits = "";

  for (let i = 0; i < decimalDigits - 2; i++) {
    optionalDigits += "0";
  }

  return numeral(round(num, decimalDigits)).format(`0,0.00[${optionalDigits}]`);
};

export const formatFiatValue = (num: number, decimals: number = 2) => {
  return `$${roundToDecimalStr(num, decimals)}`;
};
