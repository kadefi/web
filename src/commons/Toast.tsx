import { useEffect, useState } from "react";
import SnackBarAlert from "./SnackBarAlert";

export enum ToastType {
  Success = "success",
  Error = "error",
  Warn = "warning",
  Info = "info",
}

export type ToastCustomEvent = {
  type: ToastType;
  message: string;
};

const SHOW_EVENT = "temasek:toast:show";

export const Toast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType | null>(null);

  function show(evt: Event) {
    const event = evt as CustomEvent<ToastCustomEvent>;

    setIsVisible(true);
    setType(event.detail.type);
    setMessage(event.detail.message);
  }

  function hide() {
    setIsVisible(false);
    setMessage("");
  }

  useEffect(() => {
    document.addEventListener(SHOW_EVENT, show);
  }, []);

  if (!isVisible || type === null) {
    return null;
  }

  return <SnackBarAlert message={message} isOpen={isVisible} handleClose={hide} severity={type} />;
};

export function showToast(type: ToastType, message: string) {
  console.log("show toast");
  const event = new CustomEvent<ToastCustomEvent>(SHOW_EVENT, { detail: { type, message } });

  document.dispatchEvent(event);
}
