import { useState, useEffect, useRef } from "react";

export const useIsOpen = (initialIsOpen: boolean, handleFocusLoss?: () => void) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (handleFocusLoss && !isOpen) {
      handleFocusLoss();
    }
  }, [isOpen, handleFocusLoss]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isOpen, setIsOpen, handleBlur: handleClickOutside };
};
