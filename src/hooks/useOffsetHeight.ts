import { useEffect, useRef, useState } from "react";

const useOffsetHeight = <T>() => {
  const ref = useRef<T | null>(null);
  const [offsetHeight, setOffsetHeight] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current && "offsetHeight" in ref.current) {
      // @ts-ignore
      setOffsetHeight(ref.current.offsetHeight);
    }
  }, [ref]);

  return { ref, offsetHeight };
};

export default useOffsetHeight;
