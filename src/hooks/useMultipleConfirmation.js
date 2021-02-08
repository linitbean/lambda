import { useState } from "react";

export const useMultipleConfirmation = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [callback, setCallback] = useState(null);

  const toggle = () => setShow((prev) => !prev);

  const open = (title, message, action) => {
    setTitle(title);
    setMessage(message);
    setCallback(() => action);
    setShow(true);
  };

  const close = () => {
    setTitle("");
    setMessage("");
    setCallback(null);
    setShow(false);
  };

  return {
    show,
    title,
    message,
    callback,
    toggle,
    open,
    close,
  };
};
