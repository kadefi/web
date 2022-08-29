import { ReactNode } from "react";

export const sortComponentsByValueMap = (
  components: ReactNode[],
  keys: string[],
  valuesMap: { [k: string]: number },
) => {
  components.sort((a, b) => {
    const keyA = keys[components.indexOf(a)];
    const keyB = keys[components.indexOf(b)];

    if (!(keyA in valuesMap)) {
      return 1;
    }

    return valuesMap[keyB] - valuesMap[keyA];
  });
};
