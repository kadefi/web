import { useEffect, useRef, useState } from "react";

const useOffsetDimension = <T>() => {
  const ref = useRef<T | null>(null);
  const [offsetHeight, setOffsetHeight] = useState<number | null>(null);
  const [offsetWidth, setOffsetWidth] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current && "offsetHeight" in ref.current) {
      // @ts-ignore
      setOffsetHeight(ref.current.offsetHeight);
    }

    if (ref.current && "offsetWidth" in ref.current) {
      // @ts-ignore
      setOffsetWidth(ref.current.offsetWidth);
    }
  }, [ref]);

  return { ref, offsetHeight, offsetWidth };
};

export default useOffsetDimension;
